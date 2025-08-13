import { Favourites, GlobalValues } from "@/app/global";
import { useState, useEffect } from "react";
import ReviewContent from "./ReviewContent";
import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { getCachedPeriodData } from "@/app/util/sessionStorage/cache/getCachedPeriodData";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";
import { fetchFavouriteArtists } from "@/app/api/spotify/data/util/fetchFavouriteArtists";
import { fetchFavouriteSongs } from "@/app/api/spotify/data/util/fetchFavouriteSongs";
import { fetchRecentlyPlayed } from "@/app/api/spotify/data/util/fetchRecentlyPlayed";
import { isErrorType } from "@/app/util/isErrorType";
import { ReviewInterface, SongType, ErrorType } from "@/app/types/ReviewTypes";

type Props = {
  selectedOption: number;
};

const ReviewContentContainer = ({ selectedOption }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewInterface | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "short" | "medium" | "long"
  >("short");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [seeMoreVisible, setSeeMoreVisible] = useState<Record<number, boolean>>(
    {
      [Favourites.ARTISTS]: true,
      [Favourites.SONGS]: true,
      [Favourites.RECENT]: true,
    }
  );
  const { MAX_ARTISTS, MAX_SONGS, MAX_RECENT } = GlobalValues;

  const handleRefreshSongs = async () => {
    setIsLoading(true);
    setIsFetching(true);
    setIsError(false);

    const fetchedRecentSongs: SongType[] | ErrorType =
      await SpotifyClient.getRecentlyPlayed(40);

    if (isErrorType(fetchedRecentSongs)) {
      console.error(
        "Error fetching recently played:",
        fetchedRecentSongs.error
      );
      setIsError(true);
    } else {
      // Possible error with Spotify API Token
      setSessionStorage("recentlyPlayed", JSON.stringify(fetchedRecentSongs));
    }

    setIsLoading(false);
    setIsFetching(false);
  };

  const handleSeeMore = async () => {
    setIsLoading(true);
    setIsFetching(true);
    switch (selectedOption) {
      case Favourites.ARTISTS:
        await fetchFavouriteArtists(MAX_ARTISTS);
        break;
      case Favourites.SONGS:
        await fetchFavouriteSongs(MAX_SONGS);
        break;
      case Favourites.RECENT:
        await fetchRecentlyPlayed(MAX_RECENT);
        break;
      default:
        console.warn("Unknown option selected");
    }

    setSeeMoreVisible((prev) => ({ ...prev, [selectedOption]: false }));
    setIsLoading(false);
    setIsFetching(false);
  };

  useEffect(() => {
    setReview(null);
    setIsLoading(true);

    let categoryKey: string;
    switch (selectedOption) {
      case Favourites.ARTISTS:
        categoryKey = "favouriteArtists";
        break;
      case Favourites.SONGS:
        categoryKey = "favouriteSongs";
        break;
      default:
        categoryKey = "recentlyPlayed";
    }

    const newContent = getCachedPeriodData(categoryKey, selectedPeriod) || [];

    setTimeout(() => {
      let newReview: ReviewInterface;
      switch (selectedOption) {
        case Favourites.ARTISTS:
          newReview = {
            title: "Your Favourite Artists",
            description: "These are the artists you've listened to the most.",
            content: newContent,
          };
          break;
        case Favourites.SONGS:
          newReview = {
            title: "Your Favourite Songs",
            description: "These are the songs you've listened to the most.",
            content: newContent,
          };
          break;
        default:
          newReview = {
            title: "Recently Played Songs",
            description: "These are your most recently played songs.",
            content: newContent,
          };
      }

      setReview(newReview);
      setIsLoading(false);
    }, 300);
  }, [selectedOption, selectedPeriod, isFetching]);

  return (
    <ReviewContent
      isLoading={isLoading}
      isError={isError}
      review={review}
      selectedOption={selectedOption}
      selectedPeriod={selectedPeriod}
      onPeriodChange={setSelectedPeriod}
      seeMoreVisible={seeMoreVisible}
      handleRefreshSongs={handleRefreshSongs}
      handleSeeMore={handleSeeMore}
    />
  );
};

export default ReviewContentContainer;
