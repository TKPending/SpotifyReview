import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

import { useRef, useState } from "react";

type Props = {
  content: any;
};

const FavouriteSong = ({ content }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false);
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
    <div className="h-32 flex">
      <a href={content.artist_href}>
        <p>{content.artist}</p>
      </a>

      <p>{content.song_duration}</p>

      <a href={content.song_href} className="flex">
        <img src={content.song_image} className="h-12 w-12" />
        <p>{content.song_name}</p>
      </a>

      <div>
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
        <audio ref={audioRef} src={content.song_preview}></audio>
      </div>
    </div>
  );
};

export default FavouriteSong;
