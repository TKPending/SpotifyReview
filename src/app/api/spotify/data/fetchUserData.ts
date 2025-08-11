import { GlobalValues } from "@/app/global";
import { Dispatch, SetStateAction } from "react";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";
import { removeSessionStorage } from "@/app/util/sessionStorage/removeSessionStorage";
import { fetchUserDetails } from "./util/fetchUserDetails";
import { fetchFavouriteArtists } from "./util/fetchFavouriteArtists";
import { fetchFavouriteSongs } from "./util/fetchFavouriteSongs";
import { fetchRecentlyPlayed } from "./util/fetchRecentlyPlayed";
import { sessionItemsToRemove } from "@/app/global";
import { isErrorType } from "@/app/util/isErrorType";

export const fetchUserData = async (
  setPageLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const user = await fetchUserDetails();
    if (isErrorType(user)) {
      throw new Error("Failed to fetch user details");
    }

    await fetchFavouriteArtists(GlobalValues.MIN_ARTISTS);
    await fetchFavouriteSongs(GlobalValues.MIN_SONGS);
    await fetchRecentlyPlayed(GlobalValues.MIN_RECENT);

    setPageLoading(false);
    setSessionStorage("review_stored", "stored");
  } catch (error) {
    // TODO: Need to do error handing
    if (typeof window !== "undefined") {
      sessionItemsToRemove.forEach((item: string) => {
        removeSessionStorage(item);
      });
      setSessionStorage("review_stored", "");
    }
    setError(true);
    console.log("Problem with setting content");
  }
};
