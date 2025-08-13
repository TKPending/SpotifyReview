import { getSpotifyCache } from "./getSpotifyCache";

export const setSpotifyCache = (
  category: string,
  period: string,
  data: any
) => {
  if (typeof window === "undefined") return;
  const cache = getSpotifyCache();
  cache[category] = cache[category] || {};
  cache[category][period] = data;
  sessionStorage.setItem("spotifyCache", JSON.stringify(cache));
};
