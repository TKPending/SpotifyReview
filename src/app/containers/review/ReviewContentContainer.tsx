import { useState, useEffect } from "react";
import Fetching from "@/app/components/Fetching";
import ReviewHeader from "./components/ReviewHeader";
import ReviewArtists from "./container/ReviewArtists";
import ReviewSongs from "./container/ReviewSongs";
import { getContentFromStorage } from "@/app/util/sessionStorage/getContentFromStorage";
import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import {
  ReviewInterface,
  ArtistType,
  SongType,
  ErrorType,
} from "@/app/types/ReviewTypes";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";
import { isErrorType } from "@/app/util/isErrorType";
import ReviewError from "@/app/components/ReviewError";
import SeeMoreButton from "./components/buttons/SeeMoreButton";
import { Favourites } from "@/app/global";

type Props = {
  selectedOption: number;
};

const ReviewContentContainer = ({ selectedOption }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewInterface | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSeeMoreVisible, setIsSeeMoreVisible] = useState<boolean>(false);

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
      setSessionStorage("recentlyPlayed", JSON.stringify(fetchedRecentSongs));
    }

    setIsLoading(false);
    setIsFetching(false);
  };

  const handleSeeMore = () => {
    // Fetch more content
    // For Artists and Songs, max is 20 items
    // Hide button after 20 items
    // For Recent, max is 100 items
  };

  useEffect(() => {
    setReview(null);
    setIsLoading(true);

    const newContent = getContentFromStorage(selectedOption);

    setTimeout(() => {
      let newReview: ReviewInterface;

      switch (selectedOption) {
        case Favourites.ARTISTS:
          newReview = {
            title: "Your Favourite Artists",
            description:
              "These are the artists you've listened to the most throughout the month. Any surprises?",
            content: newContent,
          };
          break;

        case Favourites.SONGS:
          newReview = {
            title: "Your Favourite Songs",
            description:
              "These are the songs that you've listened to the most throughout the month.",
            content: newContent,
          };
          break;

        default:
          newReview = {
            title: "Recently Played Songs",
            description:
              "These are your most recently played songs. Press on the refresh button to update them.",
            content: newContent,
          };
      }

      setReview(newReview);
      setIsLoading(false);
    }, 1000);
  }, [selectedOption, isFetching]);

  return (
    <div className="w-full sm:w-4/5 flex items-center justify-center">
      <div className="bg-green-600 h-3/4 w-[80%] rounded-lg shadow-xs shadow-gray-300 p-6 overflow-hidden">
        {isLoading && <Fetching />}
        {isError && <ReviewError text="There is an error" />}
        {!isLoading && review && (
          <div className="h-full flex flex-col gap-4">
            <ReviewHeader
              title={review.title}
              description={review.description}
              contentType={selectedOption}
              handleRefresh={handleRefreshSongs}
            />
            <div className="flex flex-col gap-4 overflow-y-auto">
              {review.content.map(
                (item: ArtistType | SongType, index: number) => (
                  <div key={index}>
                    {selectedOption === Favourites.ARTISTS ? (
                      <ReviewArtists
                        ranking={index + 1}
                        artistItem={item as ArtistType}
                      />
                    ) : (
                      <ReviewSongs
                        ranking={index + 1}
                        type={
                          selectedOption === Favourites.SONGS
                            ? "song"
                            : "recent"
                        }
                        song={item as SongType}
                      />
                    )}
                  </div>
                )
              )}

              {isSeeMoreVisible && <SeeMoreButton onClick={handleSeeMore} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewContentContainer;
