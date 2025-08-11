import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const fetchRecentlyPlayed = async (limit: number) => {
  const recentlyPlayed = await SpotifyClient.getRecentlyPlayed(limit);
  if (isErrorType(recentlyPlayed)) {
    throw new Error(recentlyPlayed.error);
  }

  setSessionStorage("recentlyPlayed", JSON.stringify(recentlyPlayed));
  console.log("Recently played songs fetched and stored in session storage.");
};
