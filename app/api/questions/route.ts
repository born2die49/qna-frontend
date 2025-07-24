import { NextResponse } from 'next/server';
import { serverApiFetch } from '@/app/lib/serverApi';

export async function POST(request: Request) {
  try {
    // 1. Get the data from the client form
    const body = await request.json();

    // 2. Use our special fetcher to forward the request to Django.
    //    It will automatically add the auth token from the cookies.
    const responseData = await serverApiFetch('/api/questions/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // 3. Send Django's response back to the client
    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error("API proxy error in /api/questions POST:", error);
    // You can customize the error response
    return NextResponse.json({ detail: 'An internal server error occurred.' }, { status: 500 });
  }
}