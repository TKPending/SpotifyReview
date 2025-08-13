import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSpotifyCache } from "@/app/util/sessionStorage/cache/setSpotifyCache";

export const fetchFavouriteSongs = async (limit: number) => {
  const favMonthlySongs = await SpotifyClient.getFavouriteSongs(limit);
  if (isErrorType(favMonthlySongs)) throw new Error(favMonthlySongs.error);
  setSpotifyCache("favouriteSongs", "short", favMonthlySongs);

  const favHalfYearSongs = await SpotifyClient.getFavouriteSongs(
    limit,
    "medium_term"
  );
  if (isErrorType(favHalfYearSongs)) throw new Error(favHalfYearSongs.error);
  setSpotifyCache("favouriteSongs", "medium", favHalfYearSongs);

  const favYearlySongs = await SpotifyClient.getFavouriteSongs(
    limit,
    "long_term"
  );
  if (isErrorType(favYearlySongs)) throw new Error(favYearlySongs.error);
  setSpotifyCache("favouriteSongs", "long", favYearlySongs);

  return {
    short: favMonthlySongs,
    medium: favHalfYearSongs,
    long: favYearlySongs,
  };
};
