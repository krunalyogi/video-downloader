import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Check environment variable or fallback to localhost
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

        const response = await fetch(`${backendUrl}/api/download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            console.error('API Proxy parsing error. Backend returned:', text.substring(0, 500));
            return NextResponse.json(
                { error: 'The backend server failed or timed out. Please try again.' },
                { status: 502 }
            );
        }

        return NextResponse.json(data, { status: response.status });
    } catch (error: unknown) {
        console.error('API Proxy Error:', error);
        return NextResponse.json(
            { error: 'Internal server error bridging to backend api' },
            { status: 500 }
        );
    }
}
