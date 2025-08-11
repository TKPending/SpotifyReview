import { Favourites } from "@/app/global";
import { getSessionStorage } from "./getSessionStorage";

export const getContentFromStorage = (selectedOption: number) => {
  if (selectedOption === Favourites.ARTISTS) {
    const artists = getSessionStorage("favouriteArtists");
    return artists ? JSON.parse(artists) : [];
  }

  if (selectedOption === Favourites.SONGS) {
    const songs = getSessionStorage("favouriteSongs");
    return songs ? JSON.parse(songs) : [];
  }

  const recents = getSessionStorage("recentlyPlayed");
  return recents ? JSON.parse(recents) : [];
};
