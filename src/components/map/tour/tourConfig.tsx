"use client"

import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { controlBoxText, legendText, navText } from "@/components/map/tour/tourText";

const tourPanelBackgroundColour = '#9cf7f7';
const tourPanelBorderRadiusWide = '20px';
const tourPanelBorderRadiusNarrow = '10px';

export const getTourConfig = (width: number, height: number): any[] => [
    {    
        content: (
            <div>
                <h2>Urban Analyst</h2>
                <br />
                This guided tour can be closed by clicking anywhere outside
                these boxes, and re-started any time by clicking on the
                <q>Help</q> button on the left.
                <br />
                <br />
                If you&apos;ve got a keyboard, you can step through with arrow
                keys, and close with <q>Escape</q>. Press an arrow now to
                start...
            </div>
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            maxWidth: maxWidth(width, true),
        }
    },
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
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        content: () => controlBoxText(width > 700),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
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
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            maxWidth: maxWidth(width, true),
        }
    },
    {    
        content: () => legendText(width > 700),
        style: {
            width: maxWidth(width),
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
        }
    },
    {
        content: ({ goTo }: { goTo: (stepIndex: number) => void }) => (
            navText(goTo, width > 700)
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            top: posControlsY(width, height, "nav"),
            width: maxWidth(width),
        },
    },

];

export default getTourConfig;
