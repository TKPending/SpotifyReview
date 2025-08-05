const clientId: string = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";

interface Payload {
  method: string;
  headers: {
    "Content-Type": "application/x-www-form-urlencoded";
  };
  body: URLSearchParams;
}
