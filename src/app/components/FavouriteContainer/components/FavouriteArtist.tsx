import { FavouriteArtistType } from "@/app/types/FavouritesType";

type Props = {
  content: FavouriteArtistType;
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

  console.log(content);

  return (
    <a
      href={content.artistHref}
      className="h-full p-8 rounded-lg text-white text-xl flex bg-black hover:bg-opacity-80"
    >
      <div className="flex flex-col gap-4 flex-1 p-4">
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold">{content.artist}</p>
          <p className="text-green-600 text-base">{content.followers.toLocaleString()} Followers</p>
        </div>

        <div className="flex items-center gap-2 w-2/3 flex-wrap">
          {content.genre.length !== 0 && <p className="text-base text-gray-200">Genre: </p>}
          {content.genre.map((genre: string, index: number) => (
            <div className="p-2 flex items-center justify-center bg-green-800 rounded">
              <p key={index} className="opacity-80 text-xs text-gray-200">{capitalizeAndSpaceOut(genre)}</p>
            </div>
          ))}
        </div>
      </div>
      <img src={content.image} className="h-32 w-32 rounde-lg" />
    </a>
  );
};

export default FavouriteArtist;
