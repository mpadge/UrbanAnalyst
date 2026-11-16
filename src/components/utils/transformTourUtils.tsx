import { getTourConfig } from '@/components/transform/tour/tourConfig';
import { useTourState } from '@/components/tour/useTourLogic';

export function useTransformTourLogic(): ReturnType<typeof useTourState<ReturnType<typeof getTourConfig>[number]>> {
    return useTourState('uatransformtour', getTourConfig);
}
