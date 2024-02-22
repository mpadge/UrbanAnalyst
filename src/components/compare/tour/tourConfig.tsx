"use client"

import useWindowSize from '@/components/window-size';
import { posControlsX, posControlsY, maxWidth } from "@/components/compare/tour/tourPositionControls";
import { controlBoxText, navText } from "@/components/compare/tour/tourText";

const tourPanelBackgroundColour = '#9cf7f7';
const tourPanelBorderRadiusWide = '20px';
const tourPanelBorderRadiusNarrow = '10px';

export const getTourConfig = (width: number, height: number) => [
    {    
        selector: '[data-tut="reactour__compare_welcome"]',
        content: () => (
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
        selector: '[data-tut="reactour__compare_page"]',
        content: (
            <div>
                <h2>Compare</h2>
                <br />
                This page compares aggregate statistics for every Urban Analyst
                city. As for maps, low values are generally better than higher
                values, so in terms of the chosen &quot;layer&quot; or statistic,
                dark-coloured bars are generally better than light-coloured bars.
            </div>
        ),
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            maxWidth: maxWidth(width, false),
        }
    },
    {
        selector: '[data-tut="reactour__compare_controls"]',
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
        selector: '[data-tut="reactour__compare_nav_buttons"]',
        style: {
            backgroundColor: tourPanelBackgroundColour,
            borderRadius: width > 700 ? tourPanelBorderRadiusWide : tourPanelBorderRadiusNarrow,
            left: posControlsX(width, "nav"),
            top: posControlsY(width, height, "nav"),
            width: maxWidth(width),
        },
        content: ({ goTo }: { goTo: (stepIndex: number) => void }) => (
            navText(goTo, width > 700)
        )
    },

];

export default getTourConfig;
