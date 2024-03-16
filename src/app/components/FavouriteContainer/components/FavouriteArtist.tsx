type Props = {
  content: any;
};

const FavouriteArtist = ({ content }: Props) => {

  const capitalizeAndSpaceOut = (genre: string): string => {
    // Capitalize each word in the genre string
    const capitalizedGenre = genre
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
    // Replace hyphens with spaces
    const spacedOutGenre = capitalizedGenre.replace(/-/g, ' ');
  
    return spacedOutGenre;
  };

  return (
    <a
      href={content.artistHref}
      className="h-full p-8 rounded-lg text-white text-xl flex bg-black hover:bg-opacity-80"
    >
      <div className="flex flex-col gap-2 flex-1 p-4">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{content.artist}</p>
          <p className="text-green-600 text-base">{content.followers.toLocaleString()} Followers</p>
        </div>

        <div className="flex gap-2 w-2/3 flex-wrap">
          {content.genre.map((genre: string, index: number) => (
            <p key={index} className="opacity-80 text-base text-green-800">{capitalizeAndSpaceOut(genre)},</p>
          ))}
        </div>
      </div>
      <img src={content.image} className="h-32 w-32 rounde-lg" />
    </a>
  );
};

export default FavouriteArtist;
