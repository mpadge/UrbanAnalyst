
export function controlBoxText1 (wide = true) {
    const line1 = wide ?
        `This is the "control center" to choose cities and data layers.` :
        `On the left side is the "control center" to choose cities and data layers.`;

    return (
            <div>
                <h2>Controls</h2>
                <br />
                {line1}
                &nbsp;Details on each layer can be seen by clicking on the
                <q>Explain layer</q> button.
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
                <br />
                <br />
                By default, <q>Extra Layers</q> pre-selects all additional
                layers which have better relationships with the chosen variable
                or <q>layer</q> in the target city. Selecting any <q>Extra
                Layers</q> which are not initially selected will generally lead
                to worse outcomes.
            </div>
        )
}

export function controlBoxText3 () {

    return (
            <div>
                <h2>Controls</h2>
                <br />
                The <q>Output Layer</q> control allows transformations to be
                viewed in terms of:
                <br />
                1. <q>Original</q> - The original layer;<br />
                2. <q>Transformed</q> - Transformed values of that layer;<br />
                3. <q>Absolute</q> - The absolute value by which each area within
                the city would have to be transformed to match the distribution
                in the target city; and<br />
                4. <q>Relative</q> - Transformations relative to original values.
            </div>
        )
}

export function legendText(wide = true) {
    const txt = wide ?
        `Each layer has a legend here, for which yellow colors are generally better, and blue colors worse.` :
        `Each layer has a legend in the lower-left corner, for which more yellow colors are generally better.`;

    return (
        <div>
            <h2>Legend</h2>
            <br />
            {txt}
        </div>
    )
}

export function navText(goTo: (stepIndex: number) => void, wide = true) {
    const line1 = wide ?
        `Finally, these buttons navigate to other Urban Analyst pages.` :
        `Finally, the buttons at the top right navigate to other Urban Analyst pages.`;

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
