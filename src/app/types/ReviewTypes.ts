export interface ArtistType {
  artist: string;
  artistHref: string;
  followers: number;
  genre: string[];
  image: string;
}

export interface FavSongType {
  artist: string;
  artist_href: string;
  artist_id: string;
  artist_image: string;
  song_duration: number;
  song_href: string;
  song_image: string;
  song_name: string;
  song_preview: string;
}

export interface RecentSongType {
  timePlayed: string;
  artist: string;
  artishHref: string;
  albumName: string;
  songName: string;
  songHref: string;
  image: string;
  songPreviewUrl: string;
}

export interface UserDetailType {
  user: string;
  url: string;
  userAvatar: string;
}

export interface ReviewInterface {
  title: string;
  description: string;
  content: RecentSongType[] | FavSongType[] | ArtistType[];
}

export interface ErrorType {
  error: string;
}
