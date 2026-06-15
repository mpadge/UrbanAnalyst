"use client"

import { useEffect, useRef } from 'react';
import { localStorageHelpers, fetchIpDefaultCityIdx } from './localStorageUtils';

export function useIpCityDefault(onResolve: (idx: number) => void): void {
    const callbackRef = useRef(onResolve);
    useEffect(() => { callbackRef.current = onResolve; });

    useEffect(() => {
        // '0' means either "never detected" or "failed detection" — treat both as unset
        const stored = localStorageHelpers.getItem('uaCityIdx');
        if (stored !== null && stored !== '0') return;
        fetchIpDefaultCityIdx()
            .then(idx => {
                if (idx > 0) {
                    localStorageHelpers.setItem('uaCityIdx', idx.toString());
                    callbackRef.current(idx);
                }
            })
            .catch(() => {});
    }, []);  
}
