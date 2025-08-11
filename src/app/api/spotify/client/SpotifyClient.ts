import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { formatFavouriteArtists } from "./utils/formatFavouriteArtists";
import { formatSongs } from "./utils/formatSongs";
import {
  ArtistType,
  ErrorType,
  SongType,
  UserDetailType,
} from "@/app/types/ReviewTypes";

const userEndpoint: string = "https://api.spotify.com/v1/me";
const favouriteEP: string = "https://api.spotify.com/v1/me/top/";
const recentlyPlayedEP: string =
  "https://api.spotify.com/v1/me/player/recently-played?limit=";
const artistEndpoint: string = "https://api.spotify.com/v1/artists/";

class SpotifyClient {
  private accessToken: string | null = getSessionStorage("access_token") ?? "";

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

  public async userDetails(): Promise<UserDetailType | ErrorType> {
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

  public async getFavouriteSongs(
    limit: number
  ): Promise<SongType[] | ErrorType> {
    const favouriteSongs = await this.getSpotify(
      `${favouriteEP}tracks?time_range=short_term&limit=${limit}`
    );

    if (favouriteSongs) {
      const formattedSongs = formatSongs(favouriteSongs, "favourite");
      await this.getArtistImage(formattedSongs);
      return formattedSongs;
    }

    return { error: "Problem getting favourite tracks. Check user details" };
  }

  public async getFavouriteArtists(
    limit: number
  ): Promise<ArtistType[] | ErrorType> {
    const favouriteArtists = await this.getSpotify(
      `${favouriteEP}artists?time_range=short_term&limit=${limit}`
    );

    if (favouriteArtists) {
      return formatFavouriteArtists(favouriteArtists);
    }

    return { error: "Problem getting favourite artists. Check user details" };
  }

  public async getRecentlyPlayed(
    limit: number
  ): Promise<SongType[] | ErrorType> {
    const recentlyPlayed = await this.getSpotify(recentlyPlayedEP + limit);

    if (recentlyPlayed) {
      return formatSongs(recentlyPlayed, "recent");
    }

    return {
      error: "Problem getting recently played tracks. Check user details",
    };
  }

  private async getArtistImage(artists: any): Promise<void> {
    for (const artist of artists) {
      const artistId = artist.artistID;

      const artistObj = await this.getSpotify(`${artistEndpoint}${artistId}`);
      const artistImage = artistObj?.images?.[0]?.url || "default_artist.png";
      artist.image = artistImage;
    }
  }
}

export default new SpotifyClient();
