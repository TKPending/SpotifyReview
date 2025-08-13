import { Dispatch, SetStateAction } from "react";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { getSpotifyAccessToken } from "@/app/api/spotify/auth/getSpotifyAccessToken";

export const fetchAccessToken = async (
  setAccessToken: Dispatch<SetStateAction<string | null>>
) => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  if (code) {
    const codeVerifier = getSessionStorage("code_verifier") || "";
    await getSpotifyAccessToken(code, codeVerifier);
    const token = getSessionStorage("access_token");

    if (token) {
      setAccessToken(token);
    }
  }
};
