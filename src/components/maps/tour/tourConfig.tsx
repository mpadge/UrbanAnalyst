"use client"

import useWindowSize from '@/components/window-size';
import { posControlsX, posControlsY } from "@/components/maps/tour/tourPositionControls";

export const getTourConfig = (width: number, height: number) => [
    {    
        selector: '[data-tut="reactour__one"]',
        content: `This is a button`,
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
            width: '250px',
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
            width: width > 700 ? '250px' : '200px',
        }
    },
    {
        selector: '[data-tut="reactour__two"]',
        content: `This is the control panel`,
        style: {
            width: '250px',
            left: posControlsX(width, "controls"),
            top: posControlsY(width, height, "controls"),
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
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
            Table description
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
