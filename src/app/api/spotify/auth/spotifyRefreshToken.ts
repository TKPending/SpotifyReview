import { DEPLOYMENT } from "@/app/util/deployment";
import { getSessionStorage } from "@/app/util/sessionStorage/getSessionStorage";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const spotifyRefreshToken = async (): Promise<boolean | undefined> => {
  let refreshToken: string;
  if (typeof window !== "undefined") {
    refreshToken = getSessionStorage("refresh_token") || "";
  } else {
    return;
  }

  if (!refreshToken) {
    console.log("Problem fetching refreshToken from sessionStorage.");
    return;
  }

  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: DEPLOYMENT.clientId,
    }),
  };

  try {
    const body = await fetch(url, payload);
    const response = await body.json();

    if (response.access_token && response.refresh_token) {
      if (typeof window !== "undefined") {
        setSessionStorage("access_token", response.access_token);
        setSessionStorage("refresh_token", response.refresh_token);
      }
      return true;
    }
  } catch (error) {
    console.log("Problem fetching access & refresh token");
    console.error(error);
    return;
  }
};
