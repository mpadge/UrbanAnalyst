"use client"

import useWindowSize from '@/components/window-size';

// Positions of controls are all in dvw units, so panel positions here are
// converted in analogous ways.

function posControlsX(width: number, near = "controls") {
    var left;
    if (width > 1120) {
        if (near == "controls") {
            left = width / 2.3 - 250;
        } else if (near == "nav") {
            left = width / 5 + 250;
        } else {
            left = width / 2.0 - 250;
        }
    } else if (width > 700) {
        if (near == "controls") {
            left = width / 2.6 - 250;
        } else if (near == "nav") {
            left = -width / 20 + 250;
        } else {
            left = width / 1.8 - 250;
        }
    } else {
        left = 0;
    }
    left = Math.round(left) + 'px';
    if (near == "controls" || near == "legend") {
        left = '-' + left;
    }

    return left;
}

function posControlsY(width: number, height: number, near = "controls") {
    var top;
    if (width > 1120) {
        if (near == "controls") {
            top = 1 * height / 4;
        } else if (near == "nav") {
            top = 1 * height / 3.5;
        } else {
            top = 1 * height / 3.5;
        }
    } else if (width > 700) {
        if (near == "controls") {
            top = 1 * height / 5;
        } else if (near == "nav") {
            top = 1 * height / 3.5;
        } else {
            top = 1 * height / 3.6;
        }
    } else {
        top = 0;
    }
    top = Math.round(top) + 'px';
    if (near == "controls" || near == "nav") {
        top = '-' + top;
    }

    return top;
}

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
