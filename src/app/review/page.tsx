"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavouriteContainer from "../components/FavouriteContainer/FavouriteContainer";
import SpotifyClient from "../util/spotifyClient";

interface Content {
  user: any; // Define the types for user, favouriteSongs, favouriteArtists, and recentlyPlayed
  favouriteSongs: any;
  favouriteArtists: any;
  recentlyPlayed: any;
}

const ReviewPage = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken: string = sessionStorage.getItem("access_token") || "";

    if (accessToken == "") {
      sessionStorage.removeItem("review_stored");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("code_verifier");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
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

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem(
          "favouriteSongs",
          JSON.stringify(favouriteSongs)
        );
        sessionStorage.setItem(
          "favouriteArtists",
          JSON.stringify(favouriteArtists)
        );
        sessionStorage.setItem(
          "recentlyPlayed",
          JSON.stringify(recentlyPlayed)
        );

        setPageLoading(false);
        sessionStorage.setItem("review_stored", "stored");
      } catch (error) {
        // Need to do error handing
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("favouriteSongs");
        sessionStorage.removeItem("favouriteArtists");
        sessionStorage.removeItem("recentlyPlayed");

        sessionStorage.setItem("review_stored", "");

        console.log("Problem with setting content");
      }
    };

    const stored = sessionStorage.getItem("review_stored") || "";

    if (!stored || "") {
      fetchData();
    }

    setPageLoading(false);
  }, []);

  return (
    <div className="overflow-y-scroll h-screen w-screen px-16">
      {pageLoading ? (
        <div className="h-screen w-screen bg-white"></div>
      ) : (
        <div className="flex gap-40 justify-around mx-auto justify-center mt-8 w-full h-auto">
          <div className="h-auto w-full">
            <FavouriteContainer title="Favourite Artists" />
          </div>

          <div className="h-auto w-full">
            <FavouriteContainer title="Favourite Songs" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
