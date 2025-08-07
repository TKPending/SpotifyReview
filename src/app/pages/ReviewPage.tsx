import { useState } from "react";
import UserContainer from "@/app/containers/UserContainer";
import ReviewContentContainer from "@/app/containers/review/ReviewContentContainer";
import FavouriteContainer from "../containers/review/favourite/FavouriteContainer";
import RecentlyPlayed from "../containers/review/recentlyPlayed/RecentlyPlayed";

const FAVOURITE_ARTISTS: number = 0;
const FAVOURITE_SONGS: number = 1;
const RECENTLY_PLAYED: number = 2;

const ReviewPage = () => {
  const [option, setOption] = useState<number>(0);

  const handleOptionChange = (optionIndex: number) => {
    setTimeout(() => {
      setOption(optionIndex);
    }, 100);
  };

  return (
    <div className="flex flex-col sm:flex-row max-h-screen max-w-screen h-screen w-screen overscroll-none gap-2">
      <UserContainer
        handleOptionChange={handleOptionChange}
        activeOption={option}
      />
      <ReviewContentContainer>
        {option === FAVOURITE_ARTISTS && (
          <FavouriteContainer title="Favourite Artists" />
        )}
        {option === FAVOURITE_SONGS && (
          <FavouriteContainer title="Favourite Songs" />
        )}
        {option === RECENTLY_PLAYED && <RecentlyPlayed />}
      </ReviewContentContainer>
    </div>
  );
};

export default ReviewPage;
