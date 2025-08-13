import { getSpotifyCache } from "./getSpotifyCache";

export const getCachedPeriodData = (category: string, period: string) => {
  return getSpotifyCache()?.[category]?.[period] ?? null;
};
