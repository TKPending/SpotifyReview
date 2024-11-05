import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FavouriteSongType } from "@/app/types/FavouritesType";

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

  console.log(content);


  return (
    <div className="h-auto bg-black hover:bg-opacity-80 text-white flex align-center p-6 rounded-lg">
      <a className="flex-1 flex items-center justify-center gap-6 p-4" href={content.artist_href}>
        <p className="text-xl font-semibold">{content.artist}</p>
        <img src={content.artist_image} className="h-20 w-20 rounded-full"/>
      </a>

      {/* <p>{content.song_duration}</p> */}
      <div className="flex flex-1 flex-col gap-4 items-center justify-center ml-2">
        <a href={content.song_href} className="flex flex-col items-center font-semibold">
          <p className="text-green-600">{content.song_name}</p>
          <p>{minutes + ":" + (seconds < 10 ? "0" : "") + seconds}</p>
        </a>
        <button
          onClick={handleTogglePlay}
          className={`flex items-center justify-center p-2 rounded-lg cursor-pointer h-8 w-8 text-green-500 hover:bg-green-300 ${
            isPlaying ? "bg-green-300" : ""
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
        <img src={content.song_image} className="h-32 w-32 rounded-lg" />
      </div>
    </div>
  );
};

export default FavouriteSong;
