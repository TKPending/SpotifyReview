import { getSessionStorage } from "./getSessionStorage";

const FAVOURITE_ARTISTS = 0;
const FAVOURITE_SONGS = 1;

export const getContentFromStorage = (selectedOption: number) => {
  if (selectedOption === FAVOURITE_ARTISTS) {
    const artists = getSessionStorage("favouriteArtists");
    return artists ? JSON.parse(artists) : [];
  }

  if (selectedOption === FAVOURITE_SONGS) {
    const songs = getSessionStorage("favouriteSongs");
    return songs ? JSON.parse(songs) : [];
  }

  const recents = getSessionStorage("recentlyPlayed");
  return recents ? JSON.parse(recents) : [];
};
