"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchAccessToken } from "@/app/api/spotify/data/fetchAccessToken";
import AuthoriseAccessContainer from "@/app/containers/access/AuthoriseAccessContainer";

export const LandingPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      fetchAccessToken(setAccessToken);
    } else {
      router.push("/review");
    }
  }, [accessToken, router]);

  return (
    <div className="h-full w-full text-white flex flex-col justify-center items-center gap-8">
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

      <AuthoriseAccessContainer />
    </div>
  );
};

export default LandingPage;
