These components for [the 'transform'
page](https://urbananalyst.city/transform) follow this structure:

- `TransformPage.tsx` - the main page loaded from `app/transform/page.tsx`; calls the following modules:
    - `TransformPageDynamic.tsx` - an intermediate step-through component necessary to load the WASM module on the client
        - `TransformPageComponent.tsx` - the structure of the main calculate-map component, which calls the following:
            - `LoadData.tsx` to load the raw data for transform algorithm from GitHub
            - `CallTransform.tsx` to call the main WASM transform function on those data
            - `GeoJsonLayer.tsx` to pass the result of `CallData.tsx` and return a layer for Deck.GL viewing.
            - `PageMessages.tsx` to insert messages on screen during data loading and calculation
        - `control.tsx` for the control interface, which calls the following:
            - `citylist.tsx` to select the focal city
            - `layerslist.tsx` to select the correlated variables/layers to be included in transform algorithm.
            - `calculate-button.tsx` for the "Calculate" button at the bottom of control panel
        - `legend.tsx` as a separate d3 object to plot the legend.
