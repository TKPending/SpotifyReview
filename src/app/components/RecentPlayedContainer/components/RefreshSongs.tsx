import SpotifyClient from "@/app/util/SpotifyClient";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<boolean>>;
};

const RefreshSongs = ({ setRefresh, setError }: Props) => {
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

  return (
    <div
      onClick={handleRefresh}
      className="text-white cursor-pointer flex items-center justify-center"
    >
      <p className="hover:bg-opacity-80 hover:scale-105 transition duration-200 font-semibold p-4 bg-black rounded-lg">Refresh</p>
    </div>
  );
};

export default RefreshSongs;
