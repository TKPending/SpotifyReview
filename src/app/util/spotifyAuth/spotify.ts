import { generateRandomString, sha256, base64encode } from "./spotifyAuthUtil";

const clientId: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
const tokenEndpoint: string =
  process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT || "";
const redirectUri: string = "http://localhost:3000";

const scope: string = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE || "";
const authUrl: URL = new URL("https://accounts.spotify.com/authorize");

export const spotifyVerifier = async () => {
  const codeVerifier: string = generateRandomString(64);

  const hashedCode: ArrayBuffer = await sha256(codeVerifier);
  const codeChallenge: string = base64encode(hashedCode);

  if (typeof window !== "undefined") {
    sessionStorage.setItem("code_verifier", codeVerifier);
  }

  const params: Record<string, string> = {
    response_type: "code",
    client_id: clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };

  authUrl.search = new URLSearchParams(params).toString();
  location.href = authUrl.toString();
};

interface Payload {
  method: string;
  headers: {
    "Content-Type": "application/x-www-form-urlencoded";
  };
  body: URLSearchParams;
}

export const spotifyAccessToken = async (): Promise<boolean | undefined> => {
  let codeVerifier: string;

  if (typeof window !== "undefined") {
    codeVerifier = sessionStorage.getItem("code_verifier") || "";

    if (codeVerifier == "") {
      console.log("Problem setting up verifier");
      return; // TODO: Error handling
    }
  } else {
    return;
  }

  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search
  );
  const code: string = urlParams.get("code") || "";

  if (code == "") {
    console.log("Problem getting code");
    return; // TODO: Error handling
  }

  const payload: Payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
  };

  try {
    const body = await fetch(tokenEndpoint, payload);
    const response = await body.json();

    if (response.access_token && response.refresh_token) {
      sessionStorage.setItem("access_token", response.access_token);
      sessionStorage.setItem("refresh_token", response.refresh_token);
      return true;
    } else {
      return;
    }

    // TODO: Error handling
  } catch (error) {
    console.log("Problem fetching access token");
    console.error(error);
    // TODO: Handle error
  }
};

export const spotifyRefreshToken = async (): Promise<boolean | undefined> => {
  let refreshToken: string;
  if (typeof window !== "undefined") {
    refreshToken = sessionStorage.getItem('refresh_token') || "";
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
        sessionStorage.setItem('access_token', response.access_token);
        sessionStorage.setItem('refresh_token', response.refresh_token);
    }
      return true;
    }
   } catch (error) {
      console.log("Problem fetching access & refresh token");
      console.error(error);
      return;
   }
}