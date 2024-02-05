

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
        content: ({ goTo }) => (
            <div>
            Table description
            <br /> 
            You can go back to the 1st step
            <br /> 
            <br /> 
            <button color="primary" variant="outlined"
            onClick={() => goTo(0)}
            style={{
                display: "block",
                margin: "1em auto"
            }}
            >
            Go back to step 1
            </button>
            </div>
        )
    },

];

export default tourConfig;
