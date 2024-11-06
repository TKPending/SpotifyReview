import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import "@/app/styles/imageShadowStyle.css";

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
    <div className="flex hover:opacity-80 gap-4 bg-black text-white h-auto px-8 py-4 rounded-xl text-center">
      <a href={song.aritst_href} className="flex w-1/2 sm:w-1/3 gap-6 items-center justify-start">
        <img src={song.image} className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg image-shadow" />
        <p className="flex-wrap hidden sm:flex w-20">{song.artist}</p>
      </a>

      <div className="flex flex-col w-1/2 sm:w-1/3 gap-2 items-center justify-center">
        <a href={song.href} className="cursor-pointer font-semibold text-green-600">{song.song_name}</a>
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center p-2 rounded-lg cursor-pointer h-8 w-8 text-green-500 bg-green-300 bg-opacity-60 transition duration-400 ${
            isPlaying ? "bg-white bg-opacity-80 rounded-lg transition duration-400" : ""
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
          <p className="text-xs hidden sm:flex"><span className="text-green-600">Album:</span> {song.album_name}</p>
        )}
      </div>

      <div className="hidden sm:flex flex w-1/3 flex-col gap-2 items-center justify-center">
        <p className="text-green-600">Time Played</p>
        <p>{song.time_played}</p>
      </div>
    </div>
  );
};

export default RecentSongs;
