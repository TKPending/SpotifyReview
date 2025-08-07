import { FavSongType, RecentSongType } from "@/app/types/ReviewTypes";
import SongPlayerButton from "../components/SongPlayerButton";

type Props = {
  song: RecentSongType | FavSongType;
};

const ReviewSongs = ({ song }: Props) => {
  return (
    <div>
      <p>{song.artist}</p>
    </div>
  );
};

export default ReviewSongs;
