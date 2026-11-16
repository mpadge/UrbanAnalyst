import { getTourConfig } from '@/components/map/tour/tourConfig';
import { useTourState } from '@/components/tour/useTourLogic';

export function useMapTourLogic(): ReturnType<typeof useTourState<ReturnType<typeof getTourConfig>[number]>> {
    return useTourState('uamaptour', getTourConfig);
}
