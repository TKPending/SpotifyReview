import { useState, useEffect } from "react";
import FavouriteArtist from "./components/FavouriteArtist";
import FavouriteSong from "./components/FavouriteSong";
import UpdateFavourite from "./components/UpdateFavourite";

type Favourites = {
  title: string;
};

const FavouriteContainer = ({ title }: Favourites) => {
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const favouriteStr =
    title == "Favourite Artists"
      ? sessionStorage.getItem("favouriteArtists")
      : sessionStorage.getItem("favouriteSongs");

  const favourites = favouriteStr ? JSON.parse(favouriteStr) : [];

  return (
    <div className="bg-green-600 h-auto rounded-lg p-4">
      <div className="flex h-20 w-full">
        <div className="flex-1 flex-col gap-4 p-2">
          <p className="text-xl font-semibold">{title}</p>
          <p className="font-semibold">
            Your top 10 favourite ... of the month
          </p>
        </div>

        <div className="flex-1">
          <UpdateFavourite
            section={title}
            setContentLoading={setContentLoading}
          />
        </div>
      </div>

      <div className="h-[600px] overflow-y-auto overscroll-y-auto flex flex-col gap-4">
        {contentLoading && <div></div>}

        {!contentLoading && (
          <>
            {favourites.map((item: any, index: number) => (
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
