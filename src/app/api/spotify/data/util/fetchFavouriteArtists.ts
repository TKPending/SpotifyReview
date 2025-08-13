import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSpotifyCache } from "@/app/util/sessionStorage/cache/setSpotifyCache";

export const fetchFavouriteArtists = async (limit: number) => {
  const favMonthlyArtists = await SpotifyClient.getFavouriteArtists(limit);
  if (isErrorType(favMonthlyArtists)) throw new Error(favMonthlyArtists.error);
  setSpotifyCache("favouriteArtists", "short", favMonthlyArtists);

  const favHalfYearArtists = await SpotifyClient.getFavouriteArtists(
    limit,
    "medium_term"
  );
  if (isErrorType(favHalfYearArtists))
    throw new Error(favHalfYearArtists.error);
  setSpotifyCache("favouriteArtists", "medium", favHalfYearArtists);

  const favYearlyArtists = await SpotifyClient.getFavouriteArtists(
    limit,
    "long_term"
  );
  if (isErrorType(favYearlyArtists)) throw new Error(favYearlyArtists.error);
  setSpotifyCache("favouriteArtists", "long", favYearlyArtists);

  return {
    short: favMonthlyArtists,
    medium: favHalfYearArtists,
    long: favYearlyArtists,
  };
};
