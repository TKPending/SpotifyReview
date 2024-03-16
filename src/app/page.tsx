"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AuthoriseAccess from "./components/AuthoriseAccess";
import { spotifyAccessToken } from "./util/spotifyAuth/spotify";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(null)
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      await spotifyAccessToken();
      const token = sessionStorage.getItem("access_token");
      if (token) {
        setAccessToken(token);
      } else {
        console.log("Access token not found");
      }
    };

    if (!accessToken) {
      fetchAccessToken();
    } else {
      router.push("/review");
    }
  }, [accessToken, router]);

  return (
    <div className="h-screen w-full text-white flex flex-col justify-start items-center gap-8 pt-40">
      <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-green-600">Spotify</span> Review</h1>
      <div className="flex flex-col gap-2 text-center text-xl">
        <p>1. Click on <span className="text-green-600">Authorise Access</span></p>
        <p>2. Get your review</p>
        <p>Click on <span className="text-green-600">Help</span> for more</p>
      </div>

      <AuthoriseAccess />
    </div>
  );
}
