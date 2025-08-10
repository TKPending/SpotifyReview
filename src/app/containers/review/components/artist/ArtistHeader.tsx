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
        <p className="text-white text-xl">{artist}</p>
        <p className="text-xs text-green-600 font-semibold">
          Followers: {readableFollowersNumber(followers)}
        </p>
      </div>
      <Tags tags={genres} />
    </div>
  );
};

export default ArtistHeader;
