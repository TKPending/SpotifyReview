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
      <div className="h-32 w-full">
        <p>{title}</p>
      </div>

      <div className="h-auto">
        {favourites.map((item: any, index: number) => (
            <div key={index}>
                {title == "Favourite Artists" ? (
                    <FavouriteArtist content={item} />
                ) : (
                    <FavouriteSong content={item} />
                )}
            </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteContainer;
