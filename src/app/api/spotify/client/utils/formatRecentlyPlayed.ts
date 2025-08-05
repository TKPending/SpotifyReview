import { convertTimePlayed } from "@/app/util/convertTimePlayed";

export const formatRecentlyPlayed = (recentlyPlayed: any) => {
  const recentSongs: any = [];

  for (const song of recentlyPlayed.items) {
    const timestamp = convertTimePlayed(song["played_at"]);

    recentSongs.push({
      time_played: timestamp,
      artist: song.track.album.artists[0].name,
      artist_href: song.track.album.artists[0].uri,
      album_name:
        song.track.album.album_type == "album" ? song.track.album.name : "",
      song_name: song.track.name,
      song_href: song.track.album.external_urls.spotify,
      image: song.track.album.images[1].url,
      song_preview: song.track.preview_url,
    });
  }

  return recentSongs;
};
