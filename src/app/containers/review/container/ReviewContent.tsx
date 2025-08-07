import Fetching from "@/app/components/Fetching";
import { useState, useEffect } from "react";
import ReviewHeader from "../components/ReviewHeader";
import ReviewArtists from "../components/ReviewArtists";
import ReviewSongs from "../components/ReviewSongs";

type Props = {
  selectedOption: number;
  content: any;
};

interface ReviewInterface {
  title: string;
  description: string;
  content: any[];
}

const FAVOURITE_ARTISTS: number = 0;
const FAVOURITE_SONGS: number = 1;

const ReviewContent = ({ selectedOption, content }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [review, setReview] = useState<ReviewInterface | null>(null);

  useEffect(() => {
    const organiseReview = () => {
      if (selectedOption === FAVOURITE_ARTISTS) {
        setReview({
          title: "Your Favourite Artists",
          description:
            "These are the artists you've listened to the most throughout the month. Any surprises?",
          content,
        });
      } else if (selectedOption === FAVOURITE_SONGS) {
        setReview({
          title: "Your Favourite Songs",
          description:
            "These are the songs that you've listened to the most throughout the month.",
          content,
        });
      } else {
        setReview({
          title: "Recently Played Songs",
          description:
            "These are your most recently played songs. Press on the refresh button, to update the songs.",
          content,
        });
      }
    };

    setIsLoading(true);
    setTimeout(() => {
      organiseReview();
      setIsLoading(false);
    }, 1000);
  }, [content]);

  return (
    <div className="bg-green-600 h-3/4 w-[80%]">
      {isLoading && <Fetching />}
      {!isLoading && review && (
        <div>
          <ReviewHeader
            title={review.title}
            description={review.description}
            contentType={selectedOption}
          />
          {content.map((item: any, index: number) => (
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
  );
};

export default ReviewContent;
