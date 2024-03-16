import SpotifyClient from "@/app/util/SpotifyClient";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const RefreshSongs = ({ setRefresh }: Props) => {
  const handleRefresh = async () => {
    setRefresh(true);

    const fetchedRecentSongs = await SpotifyClient.getRecentlyPlayed();
    if (fetchedRecentSongs && fetchedRecentSongs.error) throw new Error(fetchedRecentSongs);

    sessionStorage.setItem("recentlyPlayed", JSON.stringify(fetchedRecentSongs));

    setRefresh(false);
  };

  return (
    <div onClick={handleRefresh} className="text-white cursor-pointer flex items-center justify-center">
      <p className="hover:bg-opacity-80 p-4 bg-black rounded-lg">Refresh</p>
    </div>
  );
};

export default RefreshSongs;
