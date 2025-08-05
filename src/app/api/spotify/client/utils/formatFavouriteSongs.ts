export const formatFavouriteSongs = (favouriteSongs: any) => {
  const songs: any = [];

  for (const song of favouriteSongs.items) {
    songs.push({
      artist: song.artists[0].name,
      artist_href: song.artists[0].uri,
      artist_id: song.artists[0].id,
      song_duration: song.duration_ms,
      song_href: song.uri,
      song_name: song.name,
      song_preview: song.preview_url,
      song_image: song.album.images[1].url,
    });
  }

  return songs;
};
