import { getSpotifyCache } from "./getSpotifyCache";

export const getCachedPeriodData = (category: string, period: string) => {
  if (category === "recentlyPlayed") {
    return getSpotifyCache()?.["recentlyPlayed"]?.["short"] ?? null;
  }

  return getSpotifyCache()?.[category]?.[period] ?? null;
};
