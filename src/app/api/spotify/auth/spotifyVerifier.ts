import { generateRandomString } from "./utils/generateRandomString";
import { sha256 } from "./utils/sha256";
import { base64encode } from "./utils/base64encode";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";
import { DEPLOYMENT } from "@/app/util/deployment";

const scope: string = process.env.NEXT_PUBLIC_SPOTIFY_SCOPE || "";
const authUrl: URL = new URL("https://accounts.spotify.com/authorize");

export const spotifyVerifier = async () => {
  const codeVerifier: string = generateRandomString(64);
  const hashedCode: ArrayBuffer = await sha256(codeVerifier);
  const codeChallenge: string = base64encode(hashedCode);

  if (typeof window !== "undefined") {
    setSessionStorage("code_verifier", codeVerifier);
  }

  const params = new URLSearchParams({
    response_type: "code",
    client_id: DEPLOYMENT.clientId,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: DEPLOYMENT.local.redirectURILanding,
  });

  authUrl.search = params.toString();
  window.location.href = authUrl.toString();
};
