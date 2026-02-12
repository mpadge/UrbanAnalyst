import { useState, useEffect, useMemo } from 'react';
import useWindowSize from '@/components/windowSize';
import getPreferredTourClass from '@/components/tourClass';
import { getTourConfig } from '@/components/map/tour/tourConfig';
import { sessionStorageHelpers } from './localStorageUtils';
import tourStyles from '@/styles/tour.module.css';

// Map tour logic hook
export function useMapTourLogic(): {
    tourProps: {
        onRequestClose: () => void;
        disableInteraction: boolean;
        steps: ReturnType<typeof getTourConfig>;
        isOpen: boolean;
        maskClassName: string;
        className: string;
        rounded: number;
        accentColor: string;
    };
    handleTourOpen: () => void;
} {
    const [tourClass, setTourClass] = useState(tourStyles.tourhelperLight);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const size = useWindowSize();
    const [isTourOpen, setTourOpen] = useState(false);

    const accentColor = "#5cb7b7";

    // Initialize tour class
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTourClass(getPreferredTourClass());
        }
    }, []);

    // Update window size
    useEffect(() => {
        const w = size?.width || 0;
        setWidth(w);
        const h = size?.height || 0;
        setHeight(h);
    }, [size]);

    // Tour configuration
    const tourConfig = useMemo(() => getTourConfig(width, height), [width, height]);

    const handleTourOpen = (): void => {
        setTourOpen(true);
    };

    // Use sessionStorage to only show tour once per session.
    const closeTour = (): void => {
        setTourOpen(false);
        sessionStorageHelpers.setItem("uamaptour", "done");
    };

    // Auto-show tour for new sessions
    useEffect(() => {
        if(!sessionStorageHelpers.getItem('uamaptour')) {
            setTourOpen(true)
        }
    }, []);

    return {
        tourProps: {
            onRequestClose: closeTour,
            disableInteraction: false,
            steps: tourConfig,
            isOpen: isTourOpen,
            maskClassName: tourStyles.tourmask,
            className: tourClass,
            rounded: 5,
            accentColor: accentColor
        },
        handleTourOpen
    };
}