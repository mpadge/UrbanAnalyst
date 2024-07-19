These components for [the 'transform'
page](https://urbananalyst.city/transform) follow this structure:

- `transformPage.tsx` - the main page loaded from `app/transform/page.tsx`; calls the following modules:
    - `transformPageDynamic.tsx` - an intermediate step-through component necessary to load the WASM module on the client
        - `transformComponent.tsx` - the structure of the main calculate-map component, which calls the following:
            - `loadData.tsx` to load the raw data for transform algorithm from GitHub
            - `callTransform.tsx` to call the main WASM transform function on those data
            - `geoJsonLayer.tsx` to pass the result of `CallData.tsx` and return a layer for Deck.GL viewing.
            - `pageMessages.tsx` to insert messages on screen during data loading and calculation (currently not used)
        - `control.tsx` for the control interface, which calls the following:
            - `cityList.tsx` to select the focal city
            - `targetCityList.tsx` to select the target city for the transform algorithm
            - `layersButton.tsx` to open the `LayersList` select dialog for extra layers
            - `layersList.tsx` to select the correlated variables/layers to be included in transform algorithm.
            - `resetButton.tsx` to reset the extra layers selections.
            - `calculateButton.tsx` for the "Calculate" button at the bottom of control panel
            - `outputLayers.tsx` to select output layers to display on map (original, transformed, absolute, or relative).
        - `legend.tsx` as a separate d3 object to plot the legend.
        - `tour` as a sub-directory containing the initial reacttour components.
