import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

type Props = {
  previewAudio: any;
};

const SongPlayerButton = ({ previewAudio }: Props) => {
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
    <div className="flex flex-col sm:w-1/3 gap-2 items-center justify-center">
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
    </div>
  );
};

export default SongPlayerButton;
