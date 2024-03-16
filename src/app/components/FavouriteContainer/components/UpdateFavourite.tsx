import { useState } from "react";
import SpotifyClient from "@/app/util/SpotifyClient";
import { Dispatch, SetStateAction } from "react";

type Props = {
    section: string;
    setContentLoading: Dispatch<SetStateAction<boolean>>;
}

const UpdateFavourite = ({section, setContentLoading}: Props) => { 
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setContentLoading(true);
        setLoading(true);
        if (section == "Favourite Artists") {
            const fetchedArtists = await SpotifyClient.getFavouriteArtists();
            if (fetchedArtists && fetchedArtists.error) throw new Error(fetchedArtists.error);

            sessionStorage.setItem("favouriteArtists", JSON.stringify(fetchedArtists));
        } else {
            const fetchedSongs = await SpotifyClient.getFavouriteSongs();
            if (fetchedSongs && fetchedSongs.error) throw new Error(fetchedSongs.error);

            sessionStorage.setItem("favouriteSongs", JSON.stringify(fetchedSongs));
        }
        setLoading(false);
        setContentLoading(false);
    }

    return (
        <div aria-disabled onClick={handleUpdate} className="flex items-center justify-end rounded-lg h-full w-auto pr-6">
            <p className={`bg-black text-white hover:text-green-600 cursor-pointer p-2 rounded-lg ${loading && "bg-opacity-60"}`}>Update</p>
        </div>
    )
};

export default UpdateFavourite;