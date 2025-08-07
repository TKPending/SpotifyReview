import { Dispatch, SetStateAction } from "react";
import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";

export const fetchUserData = async (
  itemsToRemove: string[],
  setPageLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const user = await SpotifyClient.userDetails();
    const favouriteSongs = await SpotifyClient.getFavouriteSongs();
    const favouriteArtists = await SpotifyClient.getFavouriteArtists();
    const recentlyPlayed = await SpotifyClient.getRecentlyPlayed();

    if (user && user.error) throw new Error(user.error);
    if (favouriteSongs && favouriteSongs.error)
      throw new Error(favouriteSongs.error);
    if (favouriteArtists && favouriteArtists.error)
      throw new Error(favouriteArtists.error);
    if (recentlyPlayed && recentlyPlayed.error)
      throw new Error(recentlyPlayed.error);

    const itemsToAdd = [
      { name: "user", value: user },
      { name: "favouriteSongs", value: favouriteSongs },
      { name: "favouriteArtists", value: favouriteArtists },
      { name: "recentlyPlayed", value: recentlyPlayed },
    ];

    if (typeof window !== "undefined") {
      itemsToAdd.forEach((item) => {
        setSessionStorage(item.name, JSON.stringify(item.value));
      });

      setPageLoading(false);
      setSessionStorage("review_stored", "stored");
    }
  } catch (error) {
    // TODO: Need to do error handing
    if (typeof window !== "undefined") {
      itemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });
      setSessionStorage("review_stored", "");
    }
    setError(true);
    console.log("Problem with setting content");
  }
};
