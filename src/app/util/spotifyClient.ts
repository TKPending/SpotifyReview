import GET from "../api/route";
import { ApiResponse } from "../api/route";
import { formatFavouriteSongs, formatFavouriteArtists, formatRecentlyPlayed } from "./spotifyFormat";

const userEndpoint: string = "https://api.spotify.com/v1/me";
const favouriteEndpoint: string = "https://api.spotify.com/v1/me/top/";
const recentlyPlayedEndpoint: string = "https://api.spotify.com/v1/me/player/recently-played?limit=40";

class SpotifyClient {
    private accessToken: string | null = sessionStorage.getItem("access_token") ?? "";

    private async getSpotify(url: string): Promise<{} | any> {
        if (this.accessToken == "" || !this.accessToken) {
            console.log("Problem with access token. API Call");
            return;
        }

        const response: ApiResponse<unknown> = await GET(this.accessToken, url);

        if (response.data) {
            return response.data;
        } else {
            console.log("No response from spotify!");
            return;
        }
    };

    public async userDetails(): Promise<any> {
        const user = await this.getSpotify(userEndpoint);

        if (user) {
            return {
                user: user.display_name,
                url: user.external_urls,
            }
        }

        return {error: "Problem getting user details. Check user details"}
    };

    public async getFavouriteSongs() {
        const favouriteSongs = await this.getSpotify(`${favouriteEndpoint}tracks?time_range=short_term&limit=10`);

        if (favouriteSongs) {
            return formatFavouriteSongs(favouriteSongs);
        }

        return {error: "Problem getting favourite tracks. Check user details"}
    };

    public async getFavouriteArtists() {
        const favouriteArtists = await this.getSpotify(`${favouriteEndpoint}artists?time_range=short_term&limit=10`);

        if (favouriteArtists) {
            return formatFavouriteArtists(favouriteArtists);
        }

        return {error: "Problem getting favourite artists. Check user details"}
    };

    public async getRecentlyPlayed() {
        const recentlyPlayed = await this.getSpotify(recentlyPlayedEndpoint);

        if (recentlyPlayed) {
            return formatRecentlyPlayed(recentlyPlayed);
        }

        return {error: "Problem getting favourite artists. Check user details"}
    }
}

export default new SpotifyClient;
