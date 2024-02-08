"use client"

import useWindowSize from '@/components/window-size';
import { posControlsX, posControlsY, maxWidth } from "@/components/maps/tour/tourPositionControls";

export const getTourConfig = (width: number, height: number) => [
    {    
        selector: '[data-tut="reactour__maps_welcome"]',
        content: () => (
            <div>
                <h2>Urban Analyst</h2>
                <br />
                This guided tour can be re-started any time by clicking on the
                <q>Help</q> button.
                <br />
                <br />
                It can be closed by clicking anywhere outside these boxes. If you&apos;ve
                    got a keyboard, you can step through with arrow keys, and close
                with <q>Escape</q>. Press an arrow now to start...
            </div>
        ),
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: width > 700 ? '20px' : '10px',
            maxWidth: maxWidth(width, true),
        }
    },
    {
        selector: '[data-tut="reactour__map"]',
        content: (
            <div>
            This page shows interactive maps for a chosen city, and for values of a chosen variable or
                <q>layer</q>.
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
        selector: '[data-tut="reactour__controls"]',
        content: (
            <div>
                This is the <q>control center</q> to choose cities and data layers.
                <br />
                <br />
                Details on each layer can be seen by clicking on the <q>Explain layer</q> button.
                <br />
                <br />
                Layers can also be viewed in <q>Paired</q> mode, which then
                displays the strenght of relationship between two chosen layers.
                For example, selecting <q>Social</q> and <q>bicycle index</q>
                will display how strongly social disavantage is related to bicycle infrastrcuture.
                <br />
                <br />
                Lower values are always better for single layers; interpreations
                of lower vs. higher values for paired layers are always given in
                the <q>Explain layer</q> text.
                </div>
        ),
        style: {
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: '#9cf7f7',
            borderRadius: width > 700 ? '20px' : '10px',
            maxWidth: maxWidth(width, true),
        }
    },
    {    
        selector: '[data-tut="reactour__two"]',
        content: `Each layer has a legend here, for which more yellow colors are generally better.`,
        style: {
            width: '250px',
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        }
    },
    {
        selector: '[data-tut="reactour__one"]',
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
            left: posControlsX(width, "nav"),
            top: posControlsY(width, height, "nav"),
            width: maxWidth(width),
        },
        content: ({ goTo }: { goTo: (stepIndex: number) => void }) => (
            <div>
            Finally, these buttons navigate to other Urban Analyst pages.
            <br /> 
            <br /> 
            <button color="primary"
            onClick={() => goTo(0)}
            style={{
                display: "block",
                margin: "1em auto",
                border: '1px solid #f7f7f7',
                background: '#bdbcbb',
                padding: '.3em .7em',
                fontSize: 'inherit',
                cursor: 'pointer',
            }}
            >
            Go back to step 1
            </button>
            </div>
        )
    },

];

export default getTourConfig;
