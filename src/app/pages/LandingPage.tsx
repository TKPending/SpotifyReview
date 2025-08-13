"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { fetchAccessToken } from "@/app/api/spotify/data/fetchAccessToken";
import AuthoriseAccessContainer from "@/app/containers/access/AuthoriseAccessContainer";
import { getSessionStorage } from "../util/sessionStorage/getSessionStorage";

export const LandingPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getSessionStorage("access_token")
  );
  const router = useRouter();
  const keyWordsStyle: string = "text-green-600 font-semibold";

  const calledRef = useRef(false);

  useEffect(() => {
    if (!accessToken && !calledRef.current) {
      calledRef.current = true;
      fetchAccessToken(setAccessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      router.push("/review");
    }
  }, [accessToken, router]);

  return (
    <div className="h-full w-full text-white flex flex-col justify-center items-center gap-16">
      <h1 className="text-6xl font-bold mb-2 text-center">
        Welcome to <span className="text-green-600">Spotify</span> Review
      </h1>
      <div className="flex flex-col gap-4 text-center text-2xl">
        <p>
          Get insights on your favorite{" "}
          <span className={`${keyWordsStyle}`}>Artists</span> and{" "}
          <span className={`${keyWordsStyle}`}>Songs</span>, along with your
          most <span className={`${keyWordsStyle}`}>Recently Played Songs</span>
          .
        </p>
        <p>
          To get started you need to click on{" "}
          <span className={`${keyWordsStyle}`}>Authorise Access</span> to
          continue.
        </p>
      </div>

      <AuthoriseAccessContainer />
    </div>
  );
};

export default LandingPage;
