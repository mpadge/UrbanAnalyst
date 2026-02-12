import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city');
    const dataType = searchParams.get('type') || 'data';

    if (!city) {
        return Response.json({ error: 'City parameter is required' }, { status: 400 });
    }

    // https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
    const url = `https://api.github.com/repos/mpadge/UACityData/contents/${city}/${dataType}.json`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Accept': 'application/vnd.github.raw+json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch {
        // console.error('Error fetching city map data:', error);
        return Response.json({ error: 'Failed to fetch city map data' }, { status: 500 });
    }
}
