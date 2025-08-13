import Tags from "@/app/components/Tags";
import { readableFollowersNumber } from "@/app/util/readableFollowersNumber";

type Props = {
  artist: string;
  followers: number;
  genres: string[];
};

const ArtistHeader = ({ artist, followers, genres }: Props) => {
  return (
    <div className="text-white flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-white text-base md:text-2xl font-semibold">
          {artist}
        </p>
        <p className="text-xs text-green-600 font-semibold">
          Followers: {readableFollowersNumber(followers)}
        </p>
      </div>

      <div className="hidden md:flex flex-col gap-2">
        <p className="text-xs">Genre:</p>
        <Tags tags={genres} />
      </div>
    </div>
  );
};

export default ArtistHeader;
