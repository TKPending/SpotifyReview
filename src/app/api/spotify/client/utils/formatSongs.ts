import { SongType } from "@/app/types/ReviewTypes";
import { convertTimePlayed } from "@/app/util/convertTimePlayed";

export const formatSongs = (
  songList: any,
  type: "recent" | "favourite"
): SongType[] => {
  const songs: SongType[] = [];

  for (const song of songList.items) {
    if (type === "recent") {
      const timestamp = convertTimePlayed(song.played_at);

      songs.push({
        artist: song.track.album.artists[0].name,
        artistHref: song.track.album.artists[0].uri,
        songName: song.track.name,
        songHref: song.track.album.external_urls.spotify,
        songImage: song.track.album.images[1]?.url || "",
        songPreviewUrl: song.track.preview_url,
        timePlayed: timestamp,
        albumName:
          song.track.album.album_type === "album" ? song.track.album.name : "",
        songDuration: song.track.duration_ms,
        artistId: song.track.album.artists[0].id,
      });
    } else {
      // favourite songs
      songs.push({
        artist: song.artists[0].name,
        artistHref: song.artists[0].uri,
        artistId: song.artists[0].id,
        songDuration: song.duration_ms,
        songHref: song.uri,
        songName: song.name,
        songPreviewUrl: song.preview_url,
        songImage: song.album.images[1]?.url || "",
      });
    }
  }

  return songs;
};
