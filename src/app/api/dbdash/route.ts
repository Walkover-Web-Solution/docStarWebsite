import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const table = req.nextUrl.searchParams.get('table');
    const apiUrl = `${process.env.DB_BASE_URL}/68e89f851e8b7c70f10b866a/${table}`;
    try{
        const res = await fetch(apiUrl, {
            headers: {
                'auth-key': `${process.env.DB_AUTH_KEY}`,
            },
            next: {
                revalidate: 60 * 60, // Cache 1 hour
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch data for ${table}: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json(data?.data?.rows || []);
    } catch (error: any) {
        console.error(error?.response?.data || error.message);
        return NextResponse.json({ error: `Failed to fetch data for ${table}` }, { status: 500 });
    }
}