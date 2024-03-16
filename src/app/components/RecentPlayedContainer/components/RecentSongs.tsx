import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import { useRef, useState } from "react";

type Props = {
  song: any;
};

const RecentSongs = ({ song }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex hover:bg-opacity-80 gap-4 bg-black text-white h-auto px-8 py-4 rounded-xl text-center">
      <a href={song.aritst_href} className="flex w-1/3 gap-6 items-center justify-center">
        <img src={song.image} className="h-32 w-32 rounded-lg" />
        <p className="flex-wrap w-20">{song.artist}</p>
      </a>

      <div className="flex w-1/3 flex-col gap-2 items-center justify-center">
        <a href={song.href} className="cursor-pointer hover:text-green-600">{song.song_name}</a>
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center p-2 rounded-lg cursor-pointer h-8 w-8 text-green-500 hover:bg-green-300 ${
            isPlaying ? "bg-green-300" : ""
          }`}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <audio ref={audioRef} src={song.song_preview}></audio>

        {song.album_name && (
          <p className="text-xs"><span className="text-green-600">Album</span> {song.album_name}</p>
        )}
      </div>

      <div className="flex w-1/3 flex-col gap-2 items-center justify-center">
        <p>Time Played</p>
        <p>{song.time_played}</p>
      </div>
    </div>
  );
};

export default RecentSongs;
