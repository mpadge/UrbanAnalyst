"use server"

import { useEffect, useState} from 'react';
import axios from 'axios';

interface FetchProps {
    varnames: string[]
    city: string
}

export default async function FetchData(city: string) {
    const url = `https://raw.githubusercontent.com/UrbanAnalyst/CityDataPrivate/main/${city}/dataraw.json`;
    const data = axios.get(url, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

    return data;
};
