import { formatSongDuration } from "@/app/util/formatSongDuration";
import SongPlayerButton from "./SongPlayerButton";

type Props = {
  songHref: string;
  duration: number;
  timePlayed?: string;
};

const SongPlayerDetails = ({ songHref, duration, timePlayed }: Props) => {
  return (
    <div className="flex flex-col sm:w-1/3 gap-2 items-center justify-center">
      <p className="text-white text-xs">
        Duration: {formatSongDuration(duration)}
      </p>

      <SongPlayerButton previewAudio={songHref} />

      {timePlayed && <p className="text-white">{timePlayed}</p>}
    </div>
  );
};

export default SongPlayerDetails;
