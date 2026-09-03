"use client"

import { useEffect, useRef } from 'react';
import { localStorageHelpers, fetchIpDefaultCityIdx } from './localStorageUtils';

export function useIpCityDefault(onResolve: (idx: number) => void): void {
    const callbackRef = useRef(onResolve);
    useEffect(() => { callbackRef.current = onResolve; });

    useEffect(() => {
        // A stored value of '0' is a legitimate city index (e.g. Berlin), not "unset" —
        // only a genuinely absent key means no city has been resolved yet.
        const stored = localStorageHelpers.getItem('uaCityIdx');
        if (stored !== null) return;
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
