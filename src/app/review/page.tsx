"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FavouriteContainer from "../components/FavouriteContainer/FavouriteContainer";
import SpotifyClient from "@/app/util/SpotifyClient";
import RecentlyPlayed from "../components/RecentPlayedContainer/RecentlyPlayed";

interface Content {
  user: any;
  favouriteSongs: any;
  favouriteArtists: any;
  recentlyPlayed: any;
}

const ReviewPage = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const accessToken: string = sessionStorage.getItem("access_token") || "";

    if (!accessToken) {
      sessionStorage.removeItem("review_stored");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("code_verifier");
      router.push("/");
    }
  }, [error]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await SpotifyClient.userDetails();
        const favouriteSongs = await SpotifyClient.getFavouriteSongs();
        const favouriteArtists = await SpotifyClient.getFavouriteArtists();
        const recentlyPlayed = await SpotifyClient.getRecentlyPlayed();

        if (user && user.error) throw new Error(user.error);
        if (favouriteSongs && favouriteSongs.error) throw new Error(favouriteSongs.error);
        if (favouriteArtists && favouriteArtists.error) throw new Error(favouriteArtists.error);
        if (recentlyPlayed && recentlyPlayed.error) throw new Error(recentlyPlayed.error);

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("favouriteSongs",JSON.stringify(favouriteSongs));
        sessionStorage.setItem("favouriteArtists",JSON.stringify(favouriteArtists));
        sessionStorage.setItem("recentlyPlayed",JSON.stringify(recentlyPlayed));

        setPageLoading(false);
        sessionStorage.setItem("review_stored", "stored");
      } catch (error) {
        // Need to do error handing
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("favouriteSongs");
        sessionStorage.removeItem("favouriteArtists");
        sessionStorage.removeItem("recentlyPlayed");

        sessionStorage.setItem("review_stored", "");
        setError(true);
        console.log("Problem with setting content");
      }
    };

    const stored = sessionStorage.getItem("review_stored");

    if (!stored) {
      fetchData();
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 overflow-y-auto h-auto w-screen px-16 py-4">
      {pageLoading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <p className="text-green-600 text-4xl font-bold">Loading Review</p>
        </div>
      ) : (
        <div className="flex gap-40 justify-around mx-auto justify-center mt-8 w-full h-auto">
          <div className="w-full">
            <FavouriteContainer title="Favourite Artists" />
          </div>

          <div className="w-full">
            <FavouriteContainer title="Favourite Songs" />
          </div>
        </div>
      )}

      <RecentlyPlayed />
    </div>
  );
};

export default ReviewPage;
