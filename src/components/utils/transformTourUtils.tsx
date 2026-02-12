import { useState, useEffect, useMemo } from 'react';
import useWindowSize from '@/components/windowSize';
import getPreferredTourClass from '@/components/tourClass';
import { getTourConfig } from '@/components/transform/tour/tourConfig';
import { sessionStorageHelpers } from './localStorageUtils';
import tourStyles from '@/styles/tour.module.css';

// Transform tour logic hook
export function useTransformTourLogic() {
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

    const handleTourOpen = () => {
        setTourOpen(true);
    };

    // Use sessionStorage to only show tour once per session.
    const closeTour = (): void => {
        setTourOpen(false);
        sessionStorageHelpers.setItem("uatransformtour", "done");
    };

    // Auto-show tour for new sessions
    useEffect(() => {
        if(!sessionStorageHelpers.getItem('uatransformtour')) {
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