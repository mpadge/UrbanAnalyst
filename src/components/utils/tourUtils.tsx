import { useState, useMemo, useSyncExternalStore } from 'react';
import useWindowSize from '@/components/windowSize';
import getPreferredTourClass from '@/components/tourClass';
import { getTourConfig } from '@/components/compare/tour/tourConfig';
import { sessionStorageHelpers } from './localStorageUtils';
import tourStyles from '@/styles/tour.module.css';

const subscribe = (): (() => void) => () => {};

export function useTourLogic(): {
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
    // `mounted` is false on the server and during hydration, so both render
    // the same HTML; the tour then opens by default unless already completed
    // in this session. `openOverride` records explicit open / close actions.
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const [openOverride, setOpenOverride] = useState<boolean | null>(null);
    const isTourOpen = mounted &&
        (openOverride ?? !sessionStorageHelpers.getItem('uacomparetour'));

    const accentColor = "#5cb7b7";

    const tourConfig = useMemo(() => getTourConfig(width, height), [width, height]);

    const handleTourOpen = (): void => {
        setOpenOverride(true);
    };

    const closeTour = (): void => {
        setOpenOverride(false);
        sessionStorageHelpers.setItem("uacomparetour", "done");
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
