import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const fetchFavouriteSongs = async (limit: number) => {
  const favouriteSongs = await SpotifyClient.getFavouriteSongs(limit);
  if (isErrorType(favouriteSongs)) {
    throw new Error(favouriteSongs.error);
  }

  setSessionStorage("favouriteSongs", JSON.stringify(favouriteSongs));
  console.log("Favourite songs fetched and stored in session storage.");
};
