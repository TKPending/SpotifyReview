"use client";

import {
  spotifyAccessToken,
  spotifyVerifier,
} from "../util/spotifyAuth/spotify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const AuthoriseAccess = () => {
  const router: AppRouterInstance = useRouter();

  const handleAuthorisation = async () => {
    try {
      await spotifyVerifier();
    } catch (err) {
      console.log(
        "AuthoriseAccess.tsx - Problem doing with code authorisation"
      );
      console.log(err);
    }
  };

  return (
    <div
      onClick={handleAuthorisation}
      className="bg-green-600 h-12 w-40 flex items-center justify-center rounded-2xl mt-20 hover:bg-green-500 cursor-pointer"
    >
      <p className="font-semibold">Authorise Access</p>
    </div>
  );
};

export default AuthoriseAccess;
