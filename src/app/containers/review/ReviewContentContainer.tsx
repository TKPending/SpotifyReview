import { useState, useEffect } from "react";
import Fetching from "@/app/components/Fetching";
import ReviewHeader from "./components/ReviewHeader";
import ReviewArtists from "./container/ReviewArtists";
import ReviewSongs from "./container/ReviewSongs";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { ReviewInterface } from "@/app/types/ReviewTypes";

type Props = {
  selectedOption: number;
};

const FAVOURITE_ARTISTS = 0;
const FAVOURITE_SONGS = 1;

const ReviewContentContainer = ({ selectedOption }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewInterface | null>(null);

  const getContentFromStorage = () => {
    if (selectedOption === FAVOURITE_ARTISTS) {
      const artists = getSessionStorage("favouriteArtists");
      return artists ? JSON.parse(artists) : [];
    }

    if (selectedOption === FAVOURITE_SONGS) {
      const songs = getSessionStorage("favouriteSongs");
      return songs ? JSON.parse(songs) : [];
    }

    const recents = getSessionStorage("recentlyPlayed");
    return recents ? JSON.parse(recents) : [];
  };

  useEffect(() => {
    setIsLoading(true);

    const newContent = getContentFromStorage();

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
  }, [selectedOption]);

  return (
    <div className="w-full sm:w-4/5 flex items-center justify-center">
      <div className="bg-green-600 h-3/4 w-[80%]">
        {isLoading && <Fetching />}
        {!isLoading && review && (
          <div>
            <ReviewHeader
              title={review.title}
              description={review.description}
              contentType={selectedOption}
            />
            {review.content.map((item: any, index: number) => (
              <div key={index}>
                {selectedOption === FAVOURITE_ARTISTS ? (
                  <ReviewArtists artist={item} />
                ) : (
                  <ReviewSongs song={item} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewContentContainer;
