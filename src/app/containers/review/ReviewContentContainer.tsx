import { useState, useEffect } from "react";
import ReviewContent from "./container/ReviewContent";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";

type Props = {
  selectedOption: number;
};

const FAVOURITE_ARTISTS: number = 0;
const FAVOURITE_SONGS: number = 1;

const ReviewContentContainer = ({ selectedOption }: Props) => {
  const [content, setContent] = useState();

  const getContent = () => {
    let contentList;

    if (selectedOption === FAVOURITE_ARTISTS) {
      const artists = getSessionStorage("favouriteArtists");
      contentList = artists ? JSON.parse(artists) : [];
    } else if (selectedOption === FAVOURITE_SONGS) {
      const songs = getSessionStorage("favouriteSongs");
      contentList = songs ? JSON.parse(songs) : [];
    } else {
      const recents = getSessionStorage("recentlyPlayed");
      contentList = recents && JSON.parse(recents);
    }

    setContent(contentList);
  };

  useEffect(() => {
    getContent();
  }, [selectedOption]);

  return (
    <div className="w-full sm:w-4/5 flex items-center justify-center">
      <ReviewContent selectedOption={selectedOption} content={content} />
    </div>
  );
};

export default ReviewContentContainer;
