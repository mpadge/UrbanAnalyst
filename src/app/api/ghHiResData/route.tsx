import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city');

    // https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
    const url = `https://api.github.com/repos/mpadge/CityDataPrivate/contents/${city}/dataraw.json`;
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
    const data = await response.json();

    return Response.json(data);
}
