import { SongType } from "@/app/types/ReviewTypes";
import SongDetails from "@/app/containers/review/components/songs/SongDetails";
import SongPlayerDetails from "@/app/containers/review/components/songs/SongPlayerDetails";
import Ranking from "../components/Ranking";

type Props = {
  song: SongType;
  type: "song" | "recent";
  ranking: number;
};

const ReviewSongs = ({ song, type, ranking }: Props) => {
  const {
    artist,
    artistHref,
    songName,
    songHref,
    songImage,
    songPreviewUrl,
    songDuration,
    artistId,
    timePlayed,
    albumName,
  } = song;

  return (
    <a href={songHref}>
      <div className="relative flex items-center justify-between bg-black h-auto w-full rounded-lg p-4 px-8">
        {type === "song" && <Ranking ranking={ranking} />}
        <SongDetails
          artist={artist}
          image={songImage}
          songName={songName}
          albumName={albumName}
          song={type === "song"}
        />

        <SongPlayerDetails
          songHref={songPreviewUrl}
          duration={songDuration}
          timePlayed={timePlayed}
        />
      </div>
    </a>
  );
};

export default ReviewSongs;
