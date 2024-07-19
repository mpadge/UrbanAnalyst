These components for [the 'compare'
page](https://urbananalyst.city/compare) follow this structure:

- `comparePage.tsx` - the main page loaded from `app/compare/page.tsx`; calls the following modules:
    - `statsBarChart.tsx` - the d3 bar chart
- `control.tsx` for the control interface, which calls the following:
    - `explainButton.tsx` to open dialog explaining the selected layer.
    - `layerList.tsx` to select the focal layer
    - `meanAvg.tsx` to select whether to plot "mean" or "variance" of values (for single layers only)
    - `numLayers.tsx` - selector for either "single" or "paired" layers
    - `sortOrderList.tsx` - to select in which order the bars should be displayed
