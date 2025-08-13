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
      <div className="relative grid grid-cols-[1fr_auto_auto] items-center bg-black hover:bg-opacity-90 h-auto w-full rounded-lg p-4 pr-6 gap-4">
        <SongDetails
          artist={artist}
          image={songImage}
          songName={songName}
          albumName={albumName}
          song={type === "song"}
        />

        <div className="w-[200px] flex justify-end">
          <SongPlayerDetails
            songHref={songPreviewUrl}
            duration={songDuration}
            timePlayed={timePlayed}
          />
        </div>

        {type === "song" && (
          <div className="w-[50px] flex justify-end">
            <Ranking ranking={ranking} />
          </div>
        )}
      </div>
    </a>
  );
};

export default ReviewSongs;
