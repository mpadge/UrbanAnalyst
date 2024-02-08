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
            borderRadius: '20px',
            maxWidth: maxWidth(width, true),
        }
    },
    {
        selector: '[data-tut="reactour__map"]',
        content: `This page shows interactive maps for a chosen city, and for values of a chosen variable.`,
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
            left: posControlsX(width, "nav"),
            width: maxWidth(width),
        }
    },
    {
        selector: '[data-tut="reactour__controls"]',
        content: (
            <div>
            This is the main panel to choose cities and variables.
            </div>
        ),
        style: {
            width: '250px',
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        }
    },
    {
        selector: '[data-tut="reactour__one"]',
        content: `These are the navigation buttons`,
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
            left: posControlsX(width, "nav"),
            top: posControlsY(width, height, "nav"),
            width: maxWidth(width),
        }
    },
    {    
        selector: '[data-tut="reactour__two"]',
        content: `And this is the legend`,
        style: {
            width: '250px',
            left: posControlsX(width, "legend"),
            top: posControlsY(width, height, "legend"),
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        }
    },
    {
        selector: '[data-tut="reactour__three"]',
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        },
        content: ({ goTo }: { goTo: (stepIndex: number) => void }) => (
            <div>
            <h2>Table description</h2>
            <br /> 
            You can go back to the 1st step
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
