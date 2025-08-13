import SpotifyClient from "@/app/api/spotify/client/SpotifyClient";
import { isErrorType } from "@/app/util/isErrorType";
import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const fetchUserDetails = async () => {
  const user = await SpotifyClient.userDetails();
  if (isErrorType(user)) {
    throw new Error(user.error);
  }

  setSessionStorage("user", JSON.stringify(user));
};
