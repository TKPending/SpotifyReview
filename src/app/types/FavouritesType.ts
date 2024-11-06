export interface FavouriteArtistType {
    artist: string;
    artistHref: string;
    followers: number;
    genre: string[];
    image: string;
}

export interface FavouriteSongType {
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