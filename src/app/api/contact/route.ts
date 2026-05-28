import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest): Promise<Response> {
    const { name, organisation, city, serviceType, siteType, requirements, email } =
        await request.json();

    if (!name?.trim() || !email?.trim()) {
        return Response.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const subject = `New enquiry: ${organisation?.trim() || name.trim()} — ${city?.trim() || 'city not specified'}`;

    const text = `New Urban Analyst enquiry
═══════════════════════════════

Name:              ${name.trim()}
Organisation:      ${organisation?.trim() || '—'}
City of interest:  ${city?.trim() || '—'}
Service type:      ${serviceType || '—'}
Site type:         ${siteType || '—'}
Email:             ${email.trim()}

Custom requirements:
${requirements?.trim() || '—'}
`;

    const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: 'Urban Analyst <info@urbananalyst.city>',
            to: 'info@urbananalyst.city',
            reply_to: email.trim(),
            subject,
            text,
        }),
    });

    if (!res.ok) {
        return Response.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return Response.json({ ok: true });
}
