import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "";
  const tokenEndpoint = process.env.NEXT_PUBLIC_SPOTIFY_TOKEN_ENDPOINT || "";
  const redirectUri = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";

  const { code, codeVerifier } = await request.json();

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Authorization code or verifier not found" },
      { status: 400 }
    );
  }

  const payload = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: codeVerifier,
  });

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload,
    });

    const data = await response.json();

    if (data.access_token && data.refresh_token) {
      // Return tokens directly instead of setting in session storage server-side
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid token response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching access token:", error);
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }
}
