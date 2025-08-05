import { useState, useEffect } from "react";
import FavouriteArtist from "./components/FavouriteArtist";
import FavouriteSong from "./components/FavouriteSong";
import RefreshToken from "../RefreshToken";
import Fetching from "./components/Fetching";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";

type Favourites = {
  title: string;
};

const FavouriteContainer = ({ title }: Favourites) => {
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<boolean>(true);
  const favouriteStr =
    title == "Favourite Artists"
      ? getSessionStorage("favouriteArtists")
      : getSessionStorage("favouriteSongs");

  const favourites = favouriteStr ? JSON.parse(favouriteStr) : [];

  useEffect(() => {
    setTimeout(() => {
      setContentLoading(false);
    }, 1000);
  }, [contentLoading]);

  return (
    <div className="flex flex-col gap-0 lg:gap-4 bg-green-600 h-full w-full rounded-lg p-2 sm:p-4">
      <div className="flex h-auto lg:h-32 w-full">
        <div className="flex sm:flex-1 flex-col gap-2 sm:p-4 w-full ">
          <p className="text-center lg:text-left text-xl lg:text-3xl font-semibold text-black">
            {title}
          </p>
          <p className="text-center lg:text-left font-semibold text-gray-300 w-full">
            Your Top 10 Favourite{" "}
            {title === "Favourite Artists" ? "Artists" : "Songs"} Of The Month
          </p>
        </div>

        <div className="flex-1">
          {error && <RefreshToken setRefreshToken={setRefreshToken} />}
        </div>
      </div>

      <div className="h-[750px] sm:h-[600px] overflow-y-auto overscroll-y-auto flex flex-col gap-4 p-4 overscroll-none">
        {contentLoading && <Fetching />}

        {!refreshToken && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-3xl font-semibold">
              This page will refresh in 3s. Press update to see your favourites
            </p>
          </div>
        )}

        {error && favourites.error && refreshToken && (
          <div className="h-full w-full flex items-center justify-center text-center">
            <p className="text-black text-4xl font-semibold">
              Problem fetching favourite. Re-authorise!
            </p>
          </div>
        )}

        {!contentLoading && !error && (
          <>
            {!favourites.error &&
              favourites.map((item: any, index: number) => (
                <div key={index}>
                  {title == "Favourite Artists" ? (
                    <FavouriteArtist key={index} content={item} />
                  ) : (
                    <FavouriteSong key={index} content={item} />
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default FavouriteContainer;
