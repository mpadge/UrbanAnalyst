"use client"

import useWindowSize from '@/components/window-size';

// Positions of controls are all in dvw units, so panel positions here are
// converted in analogous ways.
function getLeftPos(width: number) {
    var left;
    if (width > 1120) {
        left = 2 * width / 5;
    } else if (width > 700) {
        left = 2 * width / 7;
    } else {
        left = 0;
    }
    left = '-' + Math.round(left) + 'px';

    return left;
}

export const getTourConfig = (width: number) => [
    {    
        selector: '[data-tut="reactour__one"]',
        content: `This is a button`,
        style: {
            backgroundColor: '#9cf7f7',
            borderRadius: '20px',
        }
    },
    {    
        selector: '[data-tut="reactour__two"]',
        content: `This is a text field...`,
        style: {
            position: "absolute" as const,
            top: '10px',
            width: '200px',
            left: getLeftPos(width),
            align: "right",
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
