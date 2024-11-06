import SpotifyClient from "@/app/util/SpotifyClient";
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
      sessionStorage.setItem(
        "recentlyPlayed",
        JSON.stringify(fetchedRecentSongs)
      );
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
  }

  return (
    <div
      onClick={handleRefresh}
      className="text-white cursor-pointer flex flex-col items-center justify-center"
    >
      <p onMouseOver={handleHoverOver} onMouseLeave={handleHoverOut} className="hover:bg-opacity-80 hover:scale-105 transition duration-200 font-semibold p-4 bg-black rounded-lg">Refresh</p>
      {isHovered && <p className="absolute mt-28 p-2 bg-gray-300 rounded-lg text-xs text-black transition duration-400">Click to update recent songs</p>}
    </div>
  );
};

export default RefreshSongs;
