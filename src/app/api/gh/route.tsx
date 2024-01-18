import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city');

    const url = `https://raw.githubusercontent.com/UrbanAnalyst/CityDataPrivate/main/${city}/dataraw.json`;
    const response = await fetch(url, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `token ${process.env.GITHUB_TOKEN}`
            }
            });
    const data = await response.json();

    return Response.json(data);
}
