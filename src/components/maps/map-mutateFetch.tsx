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
            // Authorization: `token ${process.env.GITHUB_TOKEN}`
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
        }
    })
    .then(response => {
        console.log("------response.data-----");
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })

    return data;
};
