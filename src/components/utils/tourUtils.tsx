import { getTourConfig } from '@/components/compare/tour/tourConfig';
import { useTourState } from '@/components/tour/useTourLogic';

export function useTourLogic(): ReturnType<typeof useTourState<ReturnType<typeof getTourConfig>[number]>> {
    return useTourState('uacomparetour', getTourConfig);
}
