This is modified from a template [Next.js](https://nextjs.org/) project
bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app),
to demonstrate how to combine [Next.js](https://nextjs.org) with
[deck.gl](https://deck.gl).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## The deck.gl bit

The default landing page from `create-next-app` has only been slightly modified
to include a link to a `/maps` page which will display internal map data with
[`deck.gl`](https://deck.gl). The base map requires a Mapbox API token which
should be saved in the root directory this repo in a file named `.env.local`
containing this:

```
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=<my-token>
```

## Building from scratch

To re-create the whole project, start afresh somewhere else and follow these steps:

- `npx create-next-app@latest --typescript`
- Make a `.env.local` file with `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` + value
- `npm install deck.gl react-map-gl mapbox-gl`
- `mkdir src/data` + copy data file across from this repo
- `mkdir src/pages/maps` + copy 2 files across from this repo
- Modify `src/pages.index.tsc` to insert link to "maps":
    - `import Link from 'next/link'`
    - Replace `<a></a>` with `<Link></Link>`

And that's it.
