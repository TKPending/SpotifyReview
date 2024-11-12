"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AnimatedBackground from "./components/AnimationContainer/AnimatedBackground";
import AuthoriseAccess from "./components/AuthoriseAccess";
import { getSessionStorage } from "./util/sessionStorageHelper";
import { spotifyAccessToken } from "./util/spotifyAuth/spotify";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const codeVerifier = getSessionStorage("code_verifier") || ""
        await spotifyAccessToken(code, codeVerifier);
        const token = getSessionStorage("access_token");

        if (token) {
          setAccessToken(token);
        } else {
          console.error("Access token not found");
        }
      }
    };

    if (!accessToken) {
      fetchAccessToken();
    } else {
      router.push("/review");
    }
  }, [accessToken, router]);

  return (
    <div className="h-full w-full text-white flex flex-col justify-center items-center gap-8">
      <AnimatedBackground />
      <h1 className="text-4xl font-bold mb-2 text-center">
        Welcome to <span className="text-green-600">Spotify</span> Review
      </h1>
      <div className="flex flex-col gap-2 text-center text-xl">
        <p>
          Click on <span className="text-green-600">Authorise Access</span> to
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
