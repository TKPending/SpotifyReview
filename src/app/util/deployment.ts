export const DEPLOYMENT = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
  scope: process.env.NEXT_PUBLIC_SPOTIFY_SCOPE || "",
  tokenEndpoint: process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT || "",
  live: {
    redirectURILanding: "https://spotify-review.vercel.app",
    redirectURIReview: "https://spotify-review.vercel.app/review",
  },
  local: {
    redirectURILanding: "http://localhost:3000",
    redirectURIReview: "http://localhost:3000/review",
  },
};
