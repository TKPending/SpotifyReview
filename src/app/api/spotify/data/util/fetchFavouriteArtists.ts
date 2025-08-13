import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const fetchFavouriteArtists = async (limit: number) => {
  const favouriteArtists = await SpotifyClient.getFavouriteArtists(limit);
  if (isErrorType(favouriteArtists)) {
    throw new Error(favouriteArtists.error);
  }

  setSessionStorage("favouriteArtists", JSON.stringify(favouriteArtists));
};
