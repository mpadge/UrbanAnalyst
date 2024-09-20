"use client"

import tourStyles from '@/styles/tour.module.css';

export default function getPreferredTourClass() {
    const prefersDarkScheme = typeof window != "undefined" ?
        window.matchMedia('(prefers-color-scheme: dark)').matches : false;
    return prefersDarkScheme ? tourStyles.tourhelperDark : tourStyles.tourhelperLight;
}
