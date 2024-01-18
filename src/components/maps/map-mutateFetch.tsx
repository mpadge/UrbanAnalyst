"use server"

import { useEffect, useState} from 'react';

interface FetchProps {
    varnames: string[]
    city: string
}

export default async function FetchData(city: string) {
    const url = `https://raw.githubusercontent.com/UrbanAnalyst/CityDataPrivate/main/${city}/dataraw.json`;
    const response = await fetch(url, {
        cache: 'no-store',
        headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }
    });
    const data = await response.json();

    return data;
};
