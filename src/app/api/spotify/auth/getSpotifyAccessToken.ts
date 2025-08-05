import { setSessionStorage } from "@/app/util/sessionStorage/setSessionStorage";

export const getSpotifyAccessToken = async (
  code: string,
  codeVerifier: string
): Promise<void> => {
  try {
    const response = await fetch("/api/spotify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, codeVerifier }),
    });
    const result = await response.json();

    if (result.success) {
      const item = result.data;
      setSessionStorage("access_token", item.access_token);
      setSessionStorage("refresh_token", item.refresh_token);
    } else {
      console.error("Error:", result.error);
    }
  } catch (error) {
    // TODO: Better error handling
    console.error("Error fetching access token:", error);
  }
};
