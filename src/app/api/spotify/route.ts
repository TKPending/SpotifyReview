import { NextResponse } from "next/server";
import { DEPLOYMENT } from "@/app/util/deployment";

export async function POST(request: Request) {
  const { code, codeVerifier } = await request.json();

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Authorization code or verifier not found" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(DEPLOYMENT.tokenEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DEPLOYMENT.clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: DEPLOYMENT.local.redirectURILanding,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();

    if (data.access_token && data.refresh_token) {
      return NextResponse.json({ success: true, data }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Invalid token response" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch access token" },
      { status: 500 }
    );
  }
}
