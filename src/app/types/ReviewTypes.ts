export interface ArtistType {
  artist: string;
  artistHref: string;
  followers: number;
  genre: string[];
  image: string;
}

export interface SongType {
  artist: string;
  artistHref: string;
  songName: string;
  songHref: string;
  songImage: string;
  songPreviewUrl: string;
  songDuration: number;
  artistId?: string;
  timePlayed?: string;
  albumName?: string;
}

export interface UserDetailType {
  user: string;
  url: string;
  userAvatar: string;
}

export interface ReviewInterface {
  title: string;
  description: string;
  content: ArtistType[] | SongType[];
}

export interface ErrorType {
  error: string;
}
