import { useState, useEffect } from 'react';

export default function useWindowSize(): { width: number | null; height: number | null } {

    const [windowSize, setWindowSize] = useState<{ width: number | null; height: number | null }>({
        width: null,
        height: null
    });

    useEffect(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
