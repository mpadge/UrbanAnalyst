
export function controlBoxText1 (wide = true): JSX.Element {
    const line1 = wide ?
        `This is the "control center" to choose cities and data layers to be transformed.` :
        `On the left side is the "control center" to choose cities and data layers to be transformed.`;

    return (
        <div>
            <h2>Controls</h2>
            <br />
            {line1}
            &nbsp;Details on individual layers can be seen by clicking on the
            <q>Explain layer</q> button on the <q>Map</q> or <q>Compare</q>
            pages.
            <br />
            <br />
            The <q>Extra Layers</q> button allows transformations to be
            applied not only in terms of the chosen variable or
            <q>layer</q>, but also in terms of relationships with other
            layers. For example, transforming the <q>Bicycle index</q> layer
            while choosing <q>Social index</q> from Extra Layers will
            transform the bicycle index in a way that also transforms its
            relationship with social deprivation to reflect that
            relationship with the target city.
        </div>
    )
}

export function controlBoxText4 (): JSX.Element {

    return (
        <div>
            <h2>Controls</h2>
            <br />
            The <q>Output Layer</q> control allows transformations to be
            viewed in terms of:
            <br />
            <br />
            1. <q>Original</q> - The original layer;<br />
            2. <q>Transformed</q> - Transformed values of that layer;<br />
            3. <q>Absolute</q> - The absolute value by which each area within
            the city would have to be transformed to match the distribution
            in the target city; and<br />
            4. <q>Relative</q> - The absolute transformation values relative to original values.
        </div>
    )
}

export function legendText(wide = true): JSX.Element {
    const txt = wide ?
        `Each transformation layer has a legend here, for which yellow colors are generally better, and blue colors worse.` :
        `Each transformation layer has a legend in the lower-left corner, for which more yellow colors are generally better.`;

    return (
        <div>
            <h2>Legend</h2>
            <br />
            {txt}
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
