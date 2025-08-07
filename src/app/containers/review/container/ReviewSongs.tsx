import SongPlayerButton from "../components/SongPlayerButton";

type Props = {
  song: any;
};

const ReviewSongs = ({ song }: Props) => {
  console.log(song);
  return (
    <div>
      <p>{song.artist}</p>
    </div>
  );
};

export default ReviewSongs;
