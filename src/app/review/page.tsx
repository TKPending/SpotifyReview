"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SpotifyClient from "@/app/util/SpotifyClient";
import Header from "../components/Header";
import LoadingTransitionPage from "@/app/page/LoadingTransitionPage";
import ReviewLayout from "@/app/layout/ReviewLayout";

interface Content {
  user: any;
  favouriteSongs: any;
  favouriteArtists: any;
  recentlyPlayed: any;
}

const itemsToRemove: string[] = ["review_stored", "access_token", "code_verifier", "refresh_token"];

const ReviewPage = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let accessToken;
    if (typeof window !== "undefined") {
      accessToken = sessionStorage.getItem("access_token") || "";
    }

    if (!accessToken) {
      if (typeof window !== "undefined") {
        itemsToRemove.forEach((item: string) => {
          sessionStorage.removeItem(item);
        })
      }
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

        const itemsToAdd = [
          {name: "user", value: user},
          {name: "favouriteSongs", value: favouriteSongs},
          {name: "favouriteArtists", value: favouriteArtists},
          {name: "recentlyPlayed", value: recentlyPlayed},
        ]

        if (typeof window !== "undefined") {
          itemsToAdd.forEach((item) => {
            sessionStorage.setItem(item.name, JSON.stringify(item.value));
          })

          setPageLoading(false);
          sessionStorage.setItem("review_stored", "stored");
        }        
      } catch (error) {
        // TODO: Need to do error handing
        if (typeof window !== "undefined") { 
          itemsToRemove.forEach((item:string) => {
            sessionStorage.removeItem(item);
          });
  
          sessionStorage.setItem("review_stored", "");
  
        }
        setError(true);
        console.log("Problem with setting content");
      }
    };

    let stored; 
    if (typeof window !== "undefined") { 
      stored = sessionStorage.getItem("review_stored"); 
    }

    if (!stored) {
      fetchData();
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="max-h-screen h-screen w-screen">
      {pageLoading ? (
        <LoadingTransitionPage />
      ) : (
        <ReviewLayout />
      )}
    </div>
  );
};

export default ReviewPage;
