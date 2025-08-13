import ReviewItemImage from "@/app/containers/review/components/ReviewItemImage";

type Props = {
  artist: string;
  image: string;
  songName: string;
  albumName?: string;
  song: boolean;
};

const SongDetails = ({ image, artist, songName, albumName, song }: Props) => {
  const mobileSizing: string = "h-16 w-16";

  return (
    <div className="flex gap-4">
      <ReviewItemImage
        imageUrl={image}
        className={`${
          !song
            ? `${mobileSizing} md:h-32 md:w-32`
            : `${mobileSizing} md:h-40 md:w-40`
        }`}
      />

      <div className="flex flex-col justify-between gap-1">
        <div className="flex flex-col gap-2">
          <p className="text-white text-base md:text-2xl font-semibold">
            {artist}
          </p>
          <p className="text-green-600 font-semibold text-[12px] md:text-[18px]">
            {songName}
          </p>
        </div>
        {albumName && (
          <div className="flex gap-1 items-center font-semibold">
            <p className="hidden md:flex text-xs text-white">Album: </p>
            <p className="text-xs md:text-base text-green-600">{albumName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongDetails;
