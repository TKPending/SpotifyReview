import { GET, ApiResponse } from "@/app/api/spotify/route";
import {
  formatFavouriteSongs,
  formatFavouriteArtists,
  formatRecentlyPlayed,
} from "./spotifyFormat";

const userEndpoint: string = "https://api.spotify.com/v1/me";
const favouriteEndpoint: string = "https://api.spotify.com/v1/me/top/";
const recentlyPlayedEndpoint: string =
  "https://api.spotify.com/v1/me/player/recently-played?limit=40";
const artistEndpoint: string = "https://api.spotify.com/v1/artists/";

class SpotifyClient {
  private accessToken: string | null =
    sessionStorage.getItem("access_token") ?? "";

  constructor() {
    if (typeof window !== "undefined") {
      this.accessToken = sessionStorage.getItem("access_token") ?? "";
    }
  }

  private async getSpotify(url: string): Promise<{} | any> {
    if (this.accessToken == "" || !this.accessToken) {
      return;
    }

    const response: ApiResponse<unknown> = await GET(this.accessToken, url);

    if (response.data) {
      return response.data;
    } else {
      return;
    }
  }

  public async userDetails(): Promise<any> {
    const user = await this.getSpotify(userEndpoint);

    if (user) {
      return {
        user: user.display_name,
        url: user.external_urls,
      };
    }

    return { error: "Problem getting user details. Check user details" };
  }

  public async getFavouriteSongs() {
    const favouriteSongs = await this.getSpotify(
      `${favouriteEndpoint}tracks?time_range=short_term&limit=10`
    );

    if (favouriteSongs) {
      const formattedSongs = formatFavouriteSongs(favouriteSongs);
      await this.getArtistImage(formattedSongs);

      return formattedSongs;
    }

    return { error: "Problem getting favourite tracks. Check user details" };
  }

  public async getFavouriteArtists() {
    const favouriteArtists = await this.getSpotify(
      `${favouriteEndpoint}artists?time_range=short_term&limit=10`
    );

    if (favouriteArtists) {
      return formatFavouriteArtists(favouriteArtists);
    }

    return { error: "Problem getting favourite artists. Check user details" };
  }

  public async getRecentlyPlayed() {
    const recentlyPlayed = await this.getSpotify(recentlyPlayedEndpoint);

    if (recentlyPlayed) {
      return formatRecentlyPlayed(recentlyPlayed);
    }

    return { error: "Problem getting favourite artists. Check user details" };
  }

  public async getArtistImage(artists: any): Promise<void> {
    for (const artist of artists) {
      const artistId = artist.artist_id;
      const artistObj = await this.getSpotify(`${artistEndpoint}${artistId}`);
      const artistImage = artistObj.images[0].url;

      artist.artist_image = artistImage;
    }
  }
}

export default new SpotifyClient();
