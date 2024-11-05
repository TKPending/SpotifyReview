import { useState, useEffect } from "react";
import FavouriteArtist from "./components/FavouriteArtist";
import FavouriteSong from "./components/FavouriteSong";
import UpdateFavourite from "./components/UpdateFavourite";
import RefreshToken from "../RefreshToken";

type Favourites = {
  title: string;
};

const FavouriteContainer = ({ title }: Favourites) => {
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<boolean>(true);
  const favouriteStr =
    title == "Favourite Artists"
      ? sessionStorage.getItem("favouriteArtists")
      : sessionStorage.getItem("favouriteSongs");

  const favourites = favouriteStr ? JSON.parse(favouriteStr) : [];

  useEffect(() => {
    setTimeout(() => {
      setContentLoading(false);
    }, 1000);
  }, [contentLoading]);

  return (
    <div className="flex flex-col gap-4 bg-green-600 h-full w-full rounded-lg p-4">
      <div className="flex h-32 w-full">
        <div className="flex-1 flex-col gap-4 p-2">
          <p className="text-xl font-semibold">{title}</p>
          <p className="font-semibold">
            Your top 10 favourite{" "}
            {title === "Favourite Artists" ? "artists" : "songs"} of the month
          </p>
        </div>

        <div className="flex-1">
          {!error ? (
            <UpdateFavourite
              section={title}
              setContentLoading={setContentLoading}
              setError={setError}
            />
          ) : (
            <RefreshToken setRefreshToken={setRefreshToken} />
          )}
        </div>
      </div>

      <div className="h-[600px] overflow-y-auto overscroll-y-auto flex flex-col gap-4">
        {contentLoading && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-black text-4xl font-semibold">
              Fetching Favourites....
            </p>
          </div>
        )}

        {!refreshToken && (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-3xl font-semibold">This page will refresh in 3s. Press update to see your favourites</p>
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
