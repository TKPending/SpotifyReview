import { setSessionStorage } from "@/app/util/sessionStorageHelper";
import SpotifyClient from "@/app/util/SpotifyClient";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { useState } from "react";

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
};

const RefreshSongs = ({ setRefresh, setError }: Props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const handleRefresh = async () => {
    setRefresh(true);

    const fetchedRecentSongs = await SpotifyClient.getRecentlyPlayed();
    if (fetchedRecentSongs && fetchedRecentSongs.error) setError(true);

    if (typeof window !== "undefined") {
      setSessionStorage("recentlyPlayed", JSON.stringify(fetchedRecentSongs));
    }

    setRefresh(false);
  };

  const handleHoverOver = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={handleRefresh}
      className="text-white cursor-pointer flex flex-col items-center justify-center"
    >
      <FontAwesomeIcon
        onMouseOver={handleHoverOver}
        onMouseLeave={handleHoverOut}
        icon={faArrowsRotate}
        className="hover:text-green-600 hover:scale-105 transition duration-200 font-semibold p-4 bg-black rounded-lg"
      />
      {isHovered && (
        <p className="absolute mt-28 p-2 bg-gray-300 rounded-lg text-xs text-black transition duration-400">
          Click to update recent songs
        </p>
      )}
    </div>
  );
};

export default RefreshSongs;
