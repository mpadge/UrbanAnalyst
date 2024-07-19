These components for [the 'map'
page](https://urbananalyst.city/map) follow this structure:

- `mapPage.tsx` - the main page loaded from `app/map/page.tsx`; calls the following modules:
    - `mapLayer.tsx` to generate the geoJSON data layer to be passed to `map.tsx`
    - `map.tsx` - to generate the `DeckGL` map for the main page
- `control.tsx` for the control interface, which calls the following:
    - `cityList.tsx` to select the city to be mapped
    - `explainButton.tsx` to open dialog explaining the selected layer.
    - `layerList.tsx` to select the focal layer
    - `numLayers.tsx` - selector for either "single" or "paired" layers
    - `layerList2.tsx` to select the correlated layer (if "Paired" layers selected)
    - `opacitySlider.tsx` - slider for map opacity control
    - `rangeSlider.tsx` - double slider for data ranges to be plotted
- `legend.tsx` as a separate d3 object to plot the legend.
