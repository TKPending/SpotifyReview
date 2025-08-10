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

type Props = {
  selectedOption: number;
};

const FAVOURITE_ARTISTS = 0;
const FAVOURITE_SONGS = 1;

const ReviewContentContainer = ({ selectedOption }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewInterface | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleRefreshSongs = async () => {
    setIsLoading(true);
    setIsFetching(true);
    setIsError(false);

    const fetchedRecentSongs: SongType[] | ErrorType =
      await SpotifyClient.getRecentlyPlayed();

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

  useEffect(() => {
    setReview(null);
    setIsLoading(true);

    const newContent = getContentFromStorage(selectedOption);

    setTimeout(() => {
      let newReview: ReviewInterface;

      switch (selectedOption) {
        case FAVOURITE_ARTISTS:
          newReview = {
            title: "Your Favourite Artists",
            description:
              "These are the artists you've listened to the most throughout the month. Any surprises?",
            content: newContent,
          };
          break;

        case FAVOURITE_SONGS:
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
                    {selectedOption === FAVOURITE_ARTISTS ? (
                      <ReviewArtists
                        ranking={index + 1}
                        artistItem={item as ArtistType}
                      />
                    ) : (
                      <ReviewSongs
                        ranking={index + 1}
                        type={
                          selectedOption === FAVOURITE_SONGS ? "song" : "recent"
                        }
                        song={item as SongType}
                      />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewContentContainer;
