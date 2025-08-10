import { FavSongType } from "@/app/types/ReviewTypes";

export const formatFavouriteSongs = (favouriteSongs: any): FavSongType[] => {
  const songs: any = [];

  for (const song of favouriteSongs.items) {
    songs.push({
      artist: song.artists[0].name,
      artistHref: song.artists[0].uri,
      artistID: song.artists[0].id,
      songDuration: song.duration_ms,
      songHref: song.uri,
      songName: song.name,
      songPreviewUrl: song.preview_url,
      songImage: song.album.images[1].url,
    });
  }

  return songs;
};
