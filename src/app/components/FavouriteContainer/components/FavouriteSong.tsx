import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FavouriteSongType } from "@/app/types/FavouritesType";
import "@/app/styles/imageShadowStyle.css";
import { useRef, useState } from "react";

type Props = {
  content: FavouriteSongType;
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

  const durationInSeconds = content.song_duration / 1000;
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.round(durationInSeconds % 60);

  return (
    <div className="h-auto bg-black hover:opacity-80 text-white flex align-center p-6 rounded-lg text-center sm:text-left">
      <a className="hidden md:flex items-center gap-4 flex-1" href={content.artist_href}>
        <img src={content.artist_image} className="h-28 w-28 hidden sm:flex rounded-lg shadow-2xl image-shadow"/>
        <p className="text-base sm:text-xl font-semibold">{content.artist}</p>
      </a>

      <div className="flex flex-1 flex-col gap-4 items-center justify-center sm:ml-2">
        <a href={content.song_href} className="flex flex-col items-center font-semibold">
          <p className="text-base text-green-600 text-center">{content.song_name}</p>
          <p className="text-xs">{minutes + ":" + (seconds < 10 ? "0" : "") + seconds}</p>
        </a>
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center p-2 rounded-full cursor-pointer h-6 w-6 sm:h-8 sm:w-8 text-green-500 bg-green-300 bg-opacity-60 transition duration-400  ${
            isPlaying ? "bg-white bg-opacity-80 rounded-lg transition duration-400" : ""
          }`}
        >
          {isPlaying ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay}/>
          )}
        </button>
        <audio ref={audioRef} src={content.song_preview}></audio>
      </div>

      <div className="flex flex-1 justify-end">
        <img src={content.song_image} className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg shadow-2xl image-shadow" />
      </div>
    </div>
  );
};

export default FavouriteSong;
