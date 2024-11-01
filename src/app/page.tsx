"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "@/app/styles/animatedBackgroundStyle.css";
import AnimatedBackground from "./components/AnimationContainer/AnimatedBackground";
import AuthoriseAccess from "./components/AuthoriseAccess";
import { spotifyAccessToken } from "./util/spotifyAuth/spotify";
import Header from "./components/Header";
import LoadingTransitionPage from "./page/LoadingTransitionPage";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null | undefined>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      await spotifyAccessToken();
      let token;

      if (typeof window !== "undefined") {
        token = sessionStorage.getItem("access_token");
      }
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
    <div className="h-screen w-full text-white flex flex-col justify-center items-center gap-8">
      <AnimatedBackground />
      <Header destination="/help" text="Need Help?" />
      <h1 className="text-4xl font-bold mb-2">
        Welcome to <span className="text-green-600">Spotify</span> Review
      </h1>
      <div className="flex flex-col gap-2 text-center text-xl">
        <p>
          Click on <span className="text-green-600">Authorize Access</span> to
          continue.
        </p>
        <p>
          Get insights on your favorite{" "}
          <span className="text-green-600">artists</span> and{" "}
          <span className="text-green-600">songs</span>.
        </p>
      </div>

      <AuthoriseAccess />
    </div>
  );
}
