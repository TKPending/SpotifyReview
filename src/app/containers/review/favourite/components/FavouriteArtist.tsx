import { FavouriteArtistType } from "@/app/types/FavouritesType";
import "@/app/styles/imageShadowStyle.css";

type Props = {
  content: FavouriteArtistType;
};

const FavouriteArtist = ({ content }: Props) => {
  const capitalizeAndSpaceOut = (genre: string): string => {
    const capitalizedGenre = genre
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    ``;

    const spacedOutGenre = capitalizedGenre.replace(/-/g, " ");

    return spacedOutGenre;
  };

  return (
    <a
      href={content.artistHref}
      className="h-full p-8 rounded-lg text-white text-xl flex bg-black hover:opacity-80"
    >
      <div className="flex flex-col gap-4 flex-1 p-4">
        <div className="flex flex-col items-start">
          <p className="text-base sm:text-xl font-semibold">{content.artist}</p>
          <p className="text-green-600 text-xs sm:text-base">
            {content.followers.toLocaleString()} Spotify Followers
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 w-2/3 flex-wrap">
          {content.genre.length !== 0 && (
            <p className="text-base text-gray-300 font-semibold">Genre: </p>
          )}
          {content.genre.map((genre: string, index: number) => (
            <div
              key={index}
              className=" p-2 flex items-center justify-center bg-green-800 rounded"
            >
              <p className="opacity-80 text-xs text-gray-200">
                {capitalizeAndSpaceOut(genre)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <img
        src={content.image}
        className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg image-shadow"
      />
    </a>
  );
};

export default FavouriteArtist;
