"use client"

import { useEffect, useMemo } from 'react';
import { TourProvider, useTour } from '@reactour/tour';
import type { StepType, PopoverContentProps } from '@reactour/tour';

// Steps in this app are never attached to a DOM element; they are centred in
// the window and then offset through `style` (see tourPositionControls). A
// valid selector which matches nothing gives @reactour/tour a null target.
const NO_TARGET = '#ua-tour-no-target';

type UAContentFn = (props: PopoverContentProps & { goTo: (stepIndex: number) => void }) => React.ReactNode;

export interface UATourStep {
    content: React.ReactElement | string | UAContentFn;
    style?: React.CSSProperties;
}

export interface UATourProps {
    isOpen: boolean;
    steps: UATourStep[];
    onRequestClose: () => void;
    disableInteraction?: boolean;
    maskClassName?: string;
    className?: string;
    rounded?: number;
    accentColor?: string;
}

// Keeps the provider's steps in sync with the (window-size dependent) steps
// prop, and reports closure (mask click, close button or Escape) to the parent.
function TourController({ steps, onRequestClose }: {
    steps: StepType[];
    onRequestClose: () => void;
}): null {
    const { isOpen, setSteps } = useTour();

    useEffect(() => {
        setSteps?.(steps);
    }, [steps, setSteps]);

    useEffect(() => {
        if (!isOpen) {
            onRequestClose();
        }
    }, [isOpen, onRequestClose]);

    return null;
}

export default function UATour(props: UATourProps): React.JSX.Element {
    const { steps: uaSteps, onRequestClose, rounded, accentColor } = props;

    const steps: StepType[] = useMemo(() => uaSteps.map((s) => ({
        selector: NO_TARGET,
        position: 'center',
        // reactour v1 passed `goTo` to function content; v3 provides
        // `setCurrentStep`, so supply `goTo` for existing step content.
        content: typeof s.content === 'function'
            ? (p: PopoverContentProps): React.ReactNode => (s.content as UAContentFn)({
                ...p,
                goTo: (i: number) => p.setCurrentStep(i),
            })
            : s.content,
        styles: {
            popover: (base) => ({ ...base, ...s.style }),
        },
    })), [uaSteps]);

    return (
        <TourProvider
            defaultOpen
            steps={steps}
            className={props.className}
            maskClassName={props.maskClassName}
            disableInteraction={props.disableInteraction}
            styles={{
                maskArea: (base) => ({ ...base, rx: rounded }),
                badge: (base) => ({ ...base, backgroundColor: accentColor }),
                dot: (base, state) => ({
                    ...base,
                    ...(state?.current ? { backgroundColor: accentColor } : {}),
                }),
            }}
        >
            <TourController steps={steps} onRequestClose={onRequestClose} />
        </TourProvider>
    );
}
