import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSpotifyCache } from "@/app/util/sessionStorage/cache/setSpotifyCache";

export const fetchRecentlyPlayed = async (limit: number) => {
  const recentlyPlayed = await SpotifyClient.getRecentlyPlayed(limit);
  if (isErrorType(recentlyPlayed)) throw new Error(recentlyPlayed.error);
  setSpotifyCache("recentlyPlayed", "short", recentlyPlayed);
  return recentlyPlayed;
};
