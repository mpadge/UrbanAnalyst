import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'Urban Analyst'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {

    const JunctionRegular = fetch(
        new URL('./junction-regular.woff', import.meta.url)
    ).then((res) => res.arrayBuffer())

    const logoSrc = await fetch(new URL('../images/map.png', import.meta.url)).then(
        (res) => res.arrayBuffer()
    )

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: 128,
                    background: 'white',
                    position: 'relative',
                }}
            >
                <img src={logoSrc} height="100%" style={{ position: 'absolute' }} />
                <span style={{ textAlign: 'center', position: 'absolute' }}>
                    Urban Analyst
                </span>

            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            fonts: [
                {
                    name: 'Junction',
                    data: await JunctionRegular,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}
