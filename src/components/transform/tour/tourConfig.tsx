"use client"

import { posControlsX, posControlsY, maxWidth } from "@/components/tourPositionControls";
import { controlBoxText1, controlBoxText4, legendText, navText } from "@/components/transform/tour/tourText";

const tourPanelBackgroundColour = '#9cf7f7';
const tourPanelBorderRadiusWide = '20px';
const tourPanelBorderRadiusNarrow = '10px';

export const getTourConfig = (width: number, height: number): any[] => [{
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
        content: (
            <div>
                <h2>Transform</h2>
                <br />
                This page allows data for a chosen city to be <q>transformed</q>
                to have the same distribution as equivalent data for a chosen
                <q>target city</q>. These transformations quantify how much the
                city would have to change to become more like the target city.
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
        content: (
            <div>
                <h2>Transform</h2>
                <br />
                Transformations are <i>minimal cost</i>, so the sum of all
                transformations represents the minimal possible overall change
                necessary for the city to be transformed to the state of the
                target city.
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
        content: () => controlBoxText1(width > 700),
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
                By default, <q>Extra Layers</q> pre-selects all additional
                layers which have better relationships with the chosen variable
                or <q>layer</q> in the target city. Selecting any <q>Extra
                    Layers</q> which are not initially selected will generally lead
                to worse outcomes. The <q>Extra Layers</q> dialog also includes
                a <q>Reset</q> button which can be used to reset layers to
                initial, default values for the chosen combination of cities and
                focal layers.
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
        content: () => controlBoxText4(),
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
