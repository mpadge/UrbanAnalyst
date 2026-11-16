export function introText(): React.JSX.Element {
    return (
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
    )
}

export function navText(goTo: (stepIndex: number) => void, wide = true): React.JSX.Element {
    const line1 = wide ?
        `Finally, these menu items navigate to other Urban Analyst pages.` :
        `Finally, the menu items navigate to other Urban Analyst pages.`;

    return (
        <div>
            <h2>Navigation</h2>
            <br />
            {line1}
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
}
