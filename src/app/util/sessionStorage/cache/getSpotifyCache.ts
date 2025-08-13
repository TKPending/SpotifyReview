export const getSpotifyCache = () => {
  if (typeof window === "undefined") return {};
  const raw = sessionStorage.getItem("spotifyCache");
  return raw ? JSON.parse(raw) : {};
};
