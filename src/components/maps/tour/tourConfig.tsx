"use client"

import useWindowSize from '@/components/window-size';
import { posControlsX, posControlsY, maxWidth } from "@/components/maps/tour/tourPositionControls";
import { controlBoxText, legendText, navText } from "@/components/maps/tour/tourText";

export const getTourConfig = (width: number, height: number) => [
    {    
        selector: '[data-tut="reactour__maps_welcome"]',
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
            backgroundColor: '#9cf7f7',
            borderRadius: width > 700 ? '20px' : '10px',
            maxWidth: maxWidth(width, true),
        }
    },
    {
        selector: '[data-tut="reactour__maps_page"]',
        content: (
            <div>
                <h2>Maps</h2>
                <br />
                This page shows interactive maps for a chosen city, and for
                    values of a chosen variable or <q>layer</q>.
            </div>
        ),
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: width > 700 ? '20px' : '10px',
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        selector: '[data-tut="reactour__maps_controls"]',
        content: () => controlBoxText(width > 700),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: '#9cf7f7',
            borderRadius: width > 700 ? '20px' : '10px',
            maxWidth: maxWidth(width, true),
        }
    },
    {    
        selector: '[data-tut="reactour__maps_legend"]',
        content: () => legendText(width > 700),
        style: {
            width: maxWidth(width),
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        }
    },
    {
        selector: '[data-tut="reactour__maps_nav_buttons"]',
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
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
