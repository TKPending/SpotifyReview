// SpotifyClient.ts
import { getSessionStorage } from "./sessionStorageHelper";
import { formatFavouriteSongs, formatFavouriteArtists, formatRecentlyPlayed } from "./spotifyFormat";

const userEndpoint: string = "https://api.spotify.com/v1/me";
const favouriteEndpoint: string = "https://api.spotify.com/v1/me/top/";
const recentlyPlayedEndpoint: string = "https://api.spotify.com/v1/me/player/recently-played?limit=40";
const artistEndpoint: string = "https://api.spotify.com/v1/artists/";

class SpotifyClient {
  private accessToken: string | null =
  getSessionStorage("access_token") ?? "";

constructor() {
  if (typeof window !== "undefined") {
    this.accessToken = getSessionStorage("access_token") ?? "";
  }
}

  private async getSpotify(url: string): Promise<any | null> {
    if (!this.accessToken) {
      return { error: "No access token available." };
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error(`Error fetching from ${url}:`, response.statusText);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data from Spotify:", error);
      return null;
    }
  }

  public async userDetails(): Promise<any> {
    const user = await this.getSpotify(userEndpoint);

    if (user) {
      const userAvatar: string = user.images?.[0]?.url || "user.png";
      return {
        user: user.display_name,
        url: user.external_urls,
        userAvatar,
      };
    }

    return { error: "Problem getting user details. Check user details" };
  }

  public async getFavouriteSongs() {
    const favouriteSongs = await this.getSpotify(`${favouriteEndpoint}tracks?time_range=short_term&limit=10`);

    if (favouriteSongs) {
      const formattedSongs = formatFavouriteSongs(favouriteSongs);
      await this.getArtistImage(formattedSongs);
      return formattedSongs;
    }

    return { error: "Problem getting favourite tracks. Check user details" };
  }

  public async getFavouriteArtists() {
    const favouriteArtists = await this.getSpotify(`${favouriteEndpoint}artists?time_range=short_term&limit=10`);

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

    return { error: "Problem getting recently played tracks. Check user details" };
  }

  private async getArtistImage(artists: any): Promise<void> {
    for (const artist of artists) {
      const artistId = artist.artist_id;
      const artistObj = await this.getSpotify(`${artistEndpoint}${artistId}`);
      const artistImage = artistObj?.images?.[0]?.url || "default_artist.png";
      artist.artist_image = artistImage;
    }
  }
}

export default new SpotifyClient();
