import { useState, useMemo } from 'react';
import useWindowSize from '@/components/windowSize';
import getPreferredTourClass from '@/components/tourClass';
import { getTourConfig } from '@/components/transform/tour/tourConfig';
import { sessionStorageHelpers } from './localStorageUtils';
import tourStyles from '@/styles/tour.module.css';

// Transform tour logic hook
export function useTransformTourLogic(): {
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
    const [tourClass] = useState(() =>
        typeof window !== 'undefined' ? getPreferredTourClass() : tourStyles.tourhelperLight
    );
    const size = useWindowSize();
    const width = size?.width || 0;
    const height = size?.height || 0;
    const [isTourOpen, setTourOpen] = useState(() =>
        typeof window !== 'undefined' && !sessionStorageHelpers.getItem('uatransformtour')
    );

    const accentColor = "#5cb7b7";

    const tourConfig = useMemo(() => getTourConfig(width, height), [width, height]);

    const handleTourOpen = (): void => {
        setTourOpen(true);
    };

    const closeTour = (): void => {
        setTourOpen(false);
        sessionStorageHelpers.setItem("uatransformtour", "done");
    };

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