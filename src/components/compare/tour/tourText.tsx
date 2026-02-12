export function controlBoxText1(wide = true): JSX.Element {
    const line1 = wide ?
        `This is the "control center" to choose cities and data layers.` :
        `On the left side is the "control center" to choose cities and data layers.`;

    return (
        <div>
            <h2>Controls</h2>
            <br />
            {line1}
            &nbsp;The first controls select which layer or layers to
            compare.  Details on each layer can be seen by clicking on the
            <q>Explain layer</q> button.
            <br />
            <br />
            Layers can also be viewed in <q>Single</q> or <q>Paired</q>
            mode. Single mode displays values for the single selected layer.
            Paired mode displays the strength of relationship between two
            chosen layers.  For example, selecting <q>Social</q> and
            <q>Bicycle Index</q> will display how strongly social
            disavantage is related to bicycle infrastrcuture. Details of
            each selection can always be seen by clicking the <q>Explain
                layer</q> button.
            <br />
            <br />
            Lower values are always better for single layers; interpreations
            of lower vs. higher values for paired layers are always given in
            the <q>Explain layer</q> text.
        </div>
    )
}

export function controlBoxText2(): JSX.Element {
    return (
        <div>
            <h2>Controls</h2>
            <br />
            For <q>Single</q> layers, there is also an option to toggle between:
            <br />
            <br />
            1. <q>Average</q>, to view average values for each city; or<br />
            2. <q>Variation</q>, to view the extent by which those average
            values vary within each city (measured as the standard deviation).
            <br />
        </div>
    )
}

export function navText(goTo: (stepIndex: number) => void, wide = true): JSX.Element {
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
