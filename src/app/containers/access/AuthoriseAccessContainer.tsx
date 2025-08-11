"use client";

import { spotifyVerifier } from "@/app/api/spotify/auth/spotifyVerifier";
import Button from "@/app/components/Button";

const AuthoriseAccessContainer = () => {
  const handleAuthorisation = async () => {
    try {
      await spotifyVerifier();
    } catch (err) {
      console.log(
        "AuthoriseAccessContainer.tsx - Problem with the code for authentication."
      );
      console.log(err);
    }
  };

  return (
    <Button
      text="Authorise Access"
      textStyle="font-semibold"
      className="bg-green-600 h-12 w-40 mt-20 hover:bg-green-500 hover:shadow-2xl"
      onClick={handleAuthorisation}
    />
  );
};

export default AuthoriseAccessContainer;
