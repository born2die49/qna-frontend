// app/api/auth/profile/route.ts

import { NextResponse } from 'next/server';
import { serverApiFetch } from '@/app/lib/serverApi';

export async function GET(request: Request) {
  try {
    // `serverApiFetch` already returns the parsed JSON data.
    const profileData = await serverApiFetch('/api/auth/profile/');

    // Simply return that data to the client.
    return NextResponse.json(profileData);

  } catch (error: any) {
    // If serverApiFetch failed (e.g., token refresh failed), it will throw an error.
    // We catch it here and return an appropriate status code.
    console.error("API proxy error in /api/auth/profile:", error);
    
    // Check for a specific authentication error to return a 401
    if (error.message.includes('Authentication failed')) {
      return NextResponse.json({ detail: 'Authentication failed. Please log in again.' }, { status: 401 });
    }

    // Otherwise, return a generic 500 error.
    return NextResponse.json({ detail: 'An internal server error occurred.' }, { status: 500 });
  }
}