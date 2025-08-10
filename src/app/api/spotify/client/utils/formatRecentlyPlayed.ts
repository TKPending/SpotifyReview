import { RecentSongType } from "@/app/types/ReviewTypes";
import { convertTimePlayed } from "@/app/util/convertTimePlayed";

export const formatRecentlyPlayed = (recentlyPlayed: any): RecentSongType[] => {
  const recentSongs: any = [];

  for (const song of recentlyPlayed.items) {
    const timestamp: string = convertTimePlayed(song["played_at"]);

    recentSongs.push({
      timePlayed: timestamp,
      artist: song.track.album.artists[0].name,
      artistHref: song.track.album.artists[0].uri,
      albumName:
        song.track.album.album_type == "album" ? song.track.album.name : "",
      songName: song.track.name,
      songHref: song.track.album.external_urls.spotify,
      image: song.track.album.images[1].url,
      songPreviewUrl: song.track.preview_url,
    });
  }

  return recentSongs;
};
