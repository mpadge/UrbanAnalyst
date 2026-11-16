"use client"

import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { panelStyle } from "@/components/tour/tourStyle";
import { introText, navText } from "@/components/tour/tourText";
import type { UATourStep } from "@/components/tour/tourWrapper";

// Steps common to the map, compare and transform tours.
export const introStep = (width: number): UATourStep => ({
    content: introText(),
    style: {
        ...panelStyle(width),
        maxWidth: maxWidth(width, true),
    },
});

export const navStep = (width: number, height: number): UATourStep => ({
    content: ({ goTo }) => navText(goTo, width > 700),
    style: {
        ...panelStyle(width),
        left: posControlsX(width, "nav"),
        top: posControlsY(width, height, "nav"),
        width: maxWidth(width),
    },
});
