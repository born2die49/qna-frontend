'use server';

import { cookies } from "next/headers"


export async function getUserId() {
  const userId = (await cookies()).get('session_userId')?.value
  return userId ? userId : null
}

export async function handleRefresh() {
    console.log('Attempting to refresh token...');
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        console.log('No refresh token found. Aborting refresh.');
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({ refresh: refreshToken }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            console.error('API Error: Failed to refresh token. Server responded with:', json);
            // ❌ OLD CODE: resetAuthCookies();
            // ✅ NEW CODE: Throw an error to signal failure. Do not modify cookies here.
            throw new Error('TokenRefreshFailed');
        }

        if (json.access) {
            console.log('✅ Access Token successfully renewed.');
            const cookiesStore = await cookies();
            cookiesStore.set('session_access_token', json.access, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60,
                path: '/'
            });

            if (json.refresh) {
                console.log('🔄 New refresh token received and saved.');
                cookiesStore.set('session_refresh_token', json.refresh, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                    path: '/'
                });
            }

            return json.access;
        } else {
             throw new Error('TokenRefreshFailed');
        }
    } catch (error) {
        console.error('Network or other error during token refresh:', error);
        // Re-throw the error so the calling function knows about the failure.
        throw error;
    }
}

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
  (await cookies()).set('session_userId', userId, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // one week
      path: '/'
  });

  (await cookies()).set('session_access_token', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1, // one day
      path: '/'
  });

  (await cookies()).set('session_refresh_token', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7, // one week
      path: '/'
  });
}


// export async function resetAuthCookies() {
//   (await cookies()).set('session_userId', '');
//   (await cookies()).set('session_access_token', '');
//   (await cookies()).set('session_refresh_token', '');
// }


export async function resetAuthCookies() {
  console.log('Resetting authentication cookies.');
  const cookiesStore = await cookies();
  // Set maxAge to a negative value to expire the cookies immediately.
  cookiesStore.set('session_userId', '', { maxAge: -1 });
  cookiesStore.set('session_access_token', '', { maxAge: -1 });
  cookiesStore.set('session_refresh_token', '', { maxAge: -1 });
}


export async function getRefreshToken() {
    let refreshToken = (await cookies()).get('session_refresh_token')?.value;

    return refreshToken;
}