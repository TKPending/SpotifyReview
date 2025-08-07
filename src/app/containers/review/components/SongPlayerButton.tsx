import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

type Props = {
  href: string;
  previewAudio: any;
  albumName: string;
  songName: string;
};

const SongPlayerButton = ({
  href,
  previewAudio,
  albumName,
  songName,
}: Props) => {
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
    <div className="flex flex-col w-1/2 sm:w-1/3 gap-2 items-center justify-center">
      <a href={href} className="cursor-pointer font-semibold text-green-600">
        {songName}
      </a>
      <button
        onClick={handleTogglePlay}
        className={`flex items-center justify-center p-2 rounded-lg cursor-pointer h-8 w-8 text-green-500 bg-green-300 bg-opacity-60 transition duration-400 ${
          isPlaying
            ? "bg-white bg-opacity-80 rounded-lg transition duration-400"
            : ""
        }`}
      >
        {isPlaying ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <audio ref={audioRef} src={previewAudio}></audio>

      {albumName && (
        <p className="text-xs hidden sm:flex">
          <span className="text-green-600">Album:</span> {albumName}
        </p>
      )}
    </div>
  );
};

export default SongPlayerButton;
