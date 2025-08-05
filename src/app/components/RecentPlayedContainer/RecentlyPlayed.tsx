import RecentSongs from "./components/RecentSongs";
import { useEffect, useState } from "react";
import Fetching from "../FavouriteContainer/components/Fetching";
import RefreshSongs from "./components/RefreshSongs";
import RefreshToken from "../RefreshToken";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";

const RecentlyPlayed = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  let recentSongs;

  if (typeof window !== "undefined") {
    const recentSongsStr = getSessionStorage("recentlyPlayed");
    recentSongs = recentSongsStr && JSON.parse(recentSongsStr);
  }

  useEffect(() => {
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  return (
    <div className="bg-green-600 sm:py-4 h-[92%] sm:h-full w-full flex max-h-screen p-2 sm:p-4 rounded-xl overflow-hidden">
      <div className="flex flex-col lg:gap-4 w-full">
        <div className="flex h-auto lg:h-20 justify-center sm:justify-start items-center px-4">
          <div className="flex flex-col gap-2 p-4">
            <p className="font-semibold text-center lg:text-left text-xl sm:text-3xl text-black">
              Recently Played Songs
            </p>
            <p className="text-center lg:text-left font-semibold text-gray-300">
              40 Of Your Most Recently Played Songs
            </p>
          </div>

          <div className="flex hidden sm:flex flex-1 items-center justify-end">
            {!error ? (
              <RefreshSongs setRefresh={setRefresh} setError={setError} />
            ) : (
              <RefreshToken setRefreshToken={setRefresh} />
            )}
          </div>
        </div>

        <div className="h-auto">
          {error && recentSongs.error && (
            <div className="flex items-center justify-center h-72 w-full">
              <p className="text-black font-semibold text-3xl">
                Problem fetching songs! Re-authorise.
              </p>
            </div>
          )}
        </div>

        <div className="h-full w-full lg:p-4 overflow-hidden">
          {recentSongs && !recentSongs.error && (
            <div className="h-full w-full">
              {refresh && !error && <Fetching />}

              {!refresh && (
                <div className="h-full py-4 flex flex-col gap-4 overflow-y-auto">
                  {recentSongs.map((song: any, index: number) => (
                    <RecentSongs key={index} song={song} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
