import RecentSongs from "./components/RecentSongs";
import { useEffect, useState } from "react";
import RefreshSongs from "./components/RefreshSongs";

const RecentlyPlayed = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const recentSongsStr = sessionStorage.getItem("recentlyPlayed");
  const recentSongs = recentSongsStr && JSON.parse(recentSongsStr);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
  }, []);

  return (
    <div className="bg-green-600 py-4 h-auto w-3/4 flex gap-4 px-12 rounded-xl">
      {!recentSongsStr && <div className="">Problem loading songs</div>}

      {recentSongs && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex h-20 items-center px-4">
            <div>
              <p className="font-semibold text-xl">Recently Played Songs</p>
              <p>
                40 of your most recently played songs! Click on refresh to
                update
              </p>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <RefreshSongs setRefresh={setRefresh} />
            </div>
          </div>

          <div className="h-auto">
            {refresh && <div className="bg-white h-72 w-full"></div>}

            {!refresh && (
              <div className="h-[900px] flex flex-col gap-4 overflow-y-auto">
                {recentSongs.map((song: any, index: number) => (
                  <RecentSongs key={index} song={song} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentlyPlayed;
