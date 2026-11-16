"use client"

import { introStep, navStep } from "@/components/tour/tourSteps";
import { panelStyle } from "@/components/tour/tourStyle";
import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { controlBoxText, legendText } from "@/components/map/tour/tourText";


export const getTourConfig = (width: number, height: number): any[] => [
    introStep(width),
    {
        content: (
            <div>
                <h2>Maps</h2>
                <br />
                This page shows interactive maps for a chosen city, and for
                values of a chosen variable or <q>layer</q>. Low values (yellow
                colors) are generally better than higher values (blue colors).
            </div>
        ),
        style: {
            ...panelStyle(width),
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        content: () => controlBoxText(width > 700),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            ...panelStyle(width),
            maxWidth: maxWidth(width, true),
        }
    },
    {
        content: (
            <div>
                <h2>Controls</h2>
                <br />
                The control panel also includes a <q>Colour Limits</q> slider
                which can be used to restrict the range of data fitted in to the
                colour scale. This can be used to focus the full colour range in
                to particular ranges or areas of interest.
            </div>
        ),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            ...panelStyle(width),
            maxWidth: maxWidth(width, true),
        }
    },
    {    
        content: () => legendText(width > 700),
        style: {
            width: maxWidth(width),
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            ...panelStyle(width),
        }
    },
    navStep(width, height),

];

export default getTourConfig;
