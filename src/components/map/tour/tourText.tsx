
export function controlBoxText(wide = true): React.JSX.Element {
    const line1 = wide ?
        `This is the "control center" to choose cities and data layers.` :
        `On the left side is the "control center" to choose cities and data layers.`;

    return (
        <div>
            <h2>Controls</h2>
            <br />
            {line1}
            &nbsp;The <q>Layer Controls</q> select what is shown on the map.
            Details on each layer selection can be seen by clicking on the
            <q>Explain layer</q> button.
            <br />
            <br />
            Layers can be viewed in <q>Single</q> or <q>Paired</q>
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

export function legendText(wide = true): React.JSX.Element {
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

