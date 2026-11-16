"use client"

import { introStep, navStep } from "@/components/tour/tourSteps";
import { panelStyle } from "@/components/tour/tourStyle";
import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { controlBoxText1, controlBoxText2 } from "@/components/compare/tour/tourText";


export const getTourConfig = (width: number, height: number): any[] => [
    introStep(width),
    {
        content: (
            <div>
                <h2>Compare</h2>
                <br />
                This page compares aggregate statistics for every Urban Analyst
                city. As for maps, low values are generally better than higher
                values, so in terms of the chosen &ldquo;layer&rdquo; or statistic,
                dark-coloured bars are generally better than light-coloured bars.
            </div>
        ),
        style: {
            ...panelStyle(width),
            left: posControlsX(width, "nav"),
            maxWidth: maxWidth(width, false),
        }
    },
    {
        content: () => controlBoxText1(width > 700),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            ...panelStyle(width),
            maxWidth: maxWidth(width, true),
        }
    },
    {
        content: () => controlBoxText2(),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            ...panelStyle(width),
            maxWidth: maxWidth(width, true),
        }
    },
    navStep(width, height),

];

export default getTourConfig;
