import RecentSongs from "./components/RecentSongs";
import { useEffect, useState } from "react";
import RefreshSongs from "./components/RefreshSongs";

const RecentlyPlayed = () => {
  const [refresh, setRefresh] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const recentSongsStr = sessionStorage.getItem("recentlyPlayed");
  const recentSongs = recentSongsStr && JSON.parse(recentSongsStr);

  useEffect(() => {
    if (refresh) {
      setTimeout(() => {
        setRefresh(false);
        if (recentSongs.error) {
          setError(true);
        }
      }, 1000);
    }
  }, []);

  return (
    <div className="bg-green-600 py-4 h-auto w-3/4 flex gap-4 px-12 rounded-xl">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex h-20 items-center px-4">
          <div>
            <p className="font-semibold text-xl">Recently Played Songs</p>
            <p>
              40 of your most recently played songs! Click on refresh to update
            </p>
          </div>
          <div className="flex flex-1 items-center justify-end">
            <RefreshSongs setRefresh={setRefresh} setError={setError} />
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

        {recentSongs && !recentSongs.error && (
          <div className="h-auto">
            {refresh && !error && (
              <div className="flex items-center justify-center h-72 w-full">
                <p className="text-black text-3xl">Fetching Recent Songs</p>
              </div>
            )}

            {!refresh && !error && (
              <div className="h-[900px] flex flex-col gap-4 overflow-y-auto">
                {recentSongs.map((song: any, index: number) => (
                  <RecentSongs key={index} song={song} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
