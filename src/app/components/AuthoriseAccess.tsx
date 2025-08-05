"use client";

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { spotifyVerifier } from "@/app/api/spotify/auth/spotifyVerifier";

const AuthoriseAccess = () => {
  const router: AppRouterInstance = useRouter();

  const handleAuthorisation = async () => {
    try {
      await spotifyVerifier();
    } catch (err) {
      console.log(
        "AuthoriseAccess.tsx - Problem with the code for authentication."
      );
      console.log(err);
    }
  };

  return (
    <div
      onClick={handleAuthorisation}
      className="bg-green-600 h-12 w-40 flex items-center justify-center rounded-2xl mt-20 hover:bg-green-500 hover:shadow-2xl hover:scale-105 transition duration-200 cursor-pointer"
    >
      <p className="font-semibold">Authorise Access</p>
    </div>
  );
};

export default AuthoriseAccess;
