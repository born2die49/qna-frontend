'use server';

import { cookies } from 'next/headers';
import { handleRefresh } from './actions'; // Import the handleRefresh function

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// This is our new fetcher for SERVER COMPONENTS
export async function serverApiFetch(
  path: string, 
  options: RequestInit = {}
) {
  let accessToken = (await cookies()).get('session_access_token')?.value;

  const makeRequest = async (token: string | undefined) => {
    const headers = new Headers(options.headers);
    headers.set('Accept', 'application/json');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    const url = `${API_URL}${path}`;
  
    return fetch(url, {
      ...options,
      headers,
      cache: 'no-store' 
    });
  }

  // Initial request
  let res = await makeRequest(accessToken);

  if (res.status === 401) {
    console.log('Access token expired. Attempting to refresh...');
    // Token is expired, try to refresh it
    try {
      const newAccessToken = await handleRefresh();
      if (newAccessToken) {
        console.log('Token refreshed successfully. Retrying the request...');
        // Retry the request with the new token
        res = await makeRequest(newAccessToken);
      } else {
        console.error('Failed to refresh token. User might be logged out.');
        // If refresh fails, we can't proceed.
        // The original response will be returned, which will lead to the error handling below.
      }
    } catch (error) {
      console.error('handleRefresh failed. User cannot be authenticated.', error);

      throw new Error('Authentication failed, unable to refresh token.');
    }
  }

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText} on ${API_URL}${path}`);
    throw new Error('Failed to fetch data from the server');
  }

  // Handle "No Content" responses
  if (res.status === 204) {
    return null;
  }

  return res.json();
}