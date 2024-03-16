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

export const formatFavouriteArtists = (favouriteArtists: any) => {
  const artists: any = [];

  for (const artist of favouriteArtists.items) {
    artists.push({
      genre: artist.genres,
      image: artist.images[1].url,
      artist: artist.name,
      artistHref: artist.uri,
      followers: artist.followers.total,
    });
  }

  return artists;
};

const timePlayed = (timestamp: string) => {
  const date = new Date(timestamp);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatRecentlyPlayed = (recentlyPlayed: any) => {
  const recentSongs: any = [];

  for (const song of recentlyPlayed.items) {
    const timestamp = timePlayed(song["played_at"]);

    recentSongs.push({
      time_played: timestamp,
      artist: song.track.album.artists[0].name,
      artist_href: song.track.album.artists[0].uri,
      album_name: song.track.album.album_type == "album" ? song.track.album.name : "",
      song_name: song.track.name,
      song_href: song.track.album.external_urls.spotify,
      image: song.track.album.images[1].url,
      song_preview: song.track.preview_url,
    });
  }

  return recentSongs;
};
