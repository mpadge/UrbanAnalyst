const tourConfig = [
    {    
        selector: '[data-tut="reactour__iso"]',
        content: `This is a button`,    
    },
    {    
        selector: '[data-tut="reactour__finalbutton"]',
        content: `This is a text field...`,    
    },
    {
        selector: '[data-tut="reactour__box"]',
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

export default tourConfig;
