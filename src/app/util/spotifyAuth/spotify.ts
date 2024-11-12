import { generateRandomString, sha256, base64encode } from "./spotifyAuthUtil";
import { getSessionStorage, setSessionStorage } from "../sessionStorageHelper";

const clientId: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
// const redirectUri: string = "https://spotify-review.vercel.app"
const redirectUri = "http://localhost:3000";


const scope: string = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE || "";
const authUrl: URL = new URL("https://accounts.spotify.com/authorize");

export const spotifyVerifier = async () => {
  const codeVerifier: string = generateRandomString(64);
  const hashedCode: ArrayBuffer = await sha256(codeVerifier);
  const codeChallenge: string = base64encode(hashedCode);

  // Store the code_verifier for later retrieval
  if (typeof window !== "undefined") {
    setSessionStorage("code_verifier", codeVerifier);
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  });

  authUrl.search = params.toString();
  window.location.href = authUrl.toString(); // Redirect to Spotify authorization
};


interface Payload {
  method: string;
  headers: {
    "Content-Type": "application/x-www-form-urlencoded";
  };
  body: URLSearchParams;
}

export const spotifyAccessToken = async (code: string, codeVerifier: string): Promise<void> => {
  try {
    const response = await fetch("/api/spotify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, codeVerifier }),
    });
    const result = await response.json();
    console.log(result);

    if (result.success) {
      const item = result.data;
      setSessionStorage("access_token", item.access_token);
      setSessionStorage("refresh_token", item.refresh_token);
    } else {
      console.error("Error:", result.error);
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
  }
};


export const spotifyRefreshToken = async (): Promise<boolean | undefined> => {
  let refreshToken: string;
  if (typeof window !== "undefined") {
    refreshToken = getSessionStorage('refresh_token') || "";
  } else {
    return;
  }

  if (!refreshToken) {
    console.log("Problem fetching refreshToken from sessionStorage.");
    return;
  }

  const url = "https://accounts.spotify.com/api/token";

   const payload = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     body: new URLSearchParams({
       grant_type: 'refresh_token',
       refresh_token: refreshToken,
       client_id: clientId
     }),
   }

   try {
    const body = await fetch(url, payload);
    const response = await body.json();
    
    if (response.access_token && response.refresh_token) {
    
      if (typeof window !== "undefined") {
        setSessionStorage('access_token', response.access_token);
        setSessionStorage('refresh_token', response.refresh_token);
    }
      return true;
    }
   } catch (error) {
      console.log("Problem fetching access & refresh token");
      console.error(error);
      return;
   }
}