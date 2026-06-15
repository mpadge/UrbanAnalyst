import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : null;

    if (!clientIp) {
        return Response.json({ latitude: null, longitude: null });
    }

    // Try ip-api.com first (free, reliable for real user IPs)
    try {
        const res = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,lat,lon`, { cache: 'no-store' });
        const json = await res.json();
        if (json.status === 'success' && typeof json.lat === 'number' && typeof json.lon === 'number') {
            return Response.json({ latitude: json.lat, longitude: json.lon });
        }
    } catch {}

    // Fall back to ipwho.is
    try {
        const res = await fetch(`https://ipwho.is/${clientIp}`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && typeof json.latitude === 'number' && typeof json.longitude === 'number') {
            return Response.json({ latitude: json.latitude, longitude: json.longitude });
        }
    } catch {}

    return Response.json({ latitude: null, longitude: null });
}
