
export function controlBoxText (wide = true) {
    const line1 = wide ?
        `This is the "control center" to choose cities and data layers.` :
        `On the left side is the "control center" to choose cities and data layers.`;

    return (
            <div>
                <h2>Controls</h2>
                <br />
                {line1}
                &nbsp;The current layer is named at the top of the page.  Details
                on each layer can be seen by clicking on the <q>Explain
                layer</q> button.
                <br />
                <br />
                Layers can also be viewed in <q>Single</q> or <q>Paired</q>
                mode. Paired mode displays the strength of relationship between
                two chosen layers.  For example, selecting <q>Social</q> and
                <q>bicycle index</q> will display how strongly social
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
