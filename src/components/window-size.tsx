import { useState, useEffect } from 'react';

export default function useWindowSize() {

    interface WindowSizeProps {
        width: number;
        height: number;
    }

    const [windowSize, setWindowSize] = useState<{width: number | null, height: number | null}>({
        width: null,
        height: null,
    });

    function isNumber(x: any): x is number {
        return typeof x === "number";
    }

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}
