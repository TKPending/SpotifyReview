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
