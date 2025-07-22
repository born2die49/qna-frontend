'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// This is our new fetcher for SERVER COMPONENTS
export async function serverApiFetch(
  path: string, 
  options: RequestInit = {}
) {
  const accessToken = (await cookies()).get('session_access_token')?.value;

  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  // If we have a token, add the Authorization header
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  
  const url = `${API_URL}${path}`;

  const res = await fetch(url, {
    ...options,
    headers,
    // This is great for debugging and server-side fetching
    cache: 'no-store' 
  });

  if (!res.ok) {
    // We can add more robust error handling later
    console.error(`API Error: ${res.status} ${res.statusText} on ${url}`);
    throw new Error('Failed to fetch data from the server');
  }

  // Handle "No Content" responses
  if (res.status === 204) {
    return null;
  }

  return res.json();
}