import { ArtistType } from "@/app/types/ReviewTypes";

export const formatFavouriteArtists = (favouriteArtists: any): ArtistType[] => {
  const artists: any = [];

  console.log(favouriteArtists);

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
