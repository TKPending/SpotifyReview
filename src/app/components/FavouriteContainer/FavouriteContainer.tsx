import FavouriteArtist from "./components/FavouriteArtist";
import FavouriteSong from "./components/FavouriteSong";

type Favourites = {
  title: string;
};

const FavouriteContainer = ({ title }: Favourites) => {
  const favouriteStr =
    title == "Favourite Artists"
      ? sessionStorage.getItem("favouriteArtists")
      : sessionStorage.getItem("favouriteSongs");

  const favourites = favouriteStr ? JSON.parse(favouriteStr) : [];

  return (
    <div className="bg-green-600 h-auto rounded-lg p-4">
      <div className="h-20 w-full p-2">
        <p className="text-xl font-semibold">{title}</p>
      </div>

      <div className="h-[600px] overflow-y-auto overscroll-y-auto flex flex-col gap-4">
        {favourites.map((item: any, index: number) => (
            <div key={index}>
                {title == "Favourite Artists" ? (
                    <FavouriteArtist key={index} content={item} />
                ) : (
                    <FavouriteSong key={index} content={item} />
                )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteContainer;
