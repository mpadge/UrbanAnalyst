import { NextPage } from "next";
import { useEffect, useState, Suspense } from "react";
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";

import * as wasm_js from '@/../pkg/uamutations.js';

interface MutateProps {
    filename1: string
    filename2: string
    varnames: string[]
    nentries: number
    alpha: number
    this_layer: string
    geoJSONcontent: any
    setGeoJSONcontent: (Object: any) => void
    handleResultChange: (Object: any) => void
}

const MapMutateComponent = (props: MutateProps) => {
    const [data1, setData1] = useState(null);
    const [data2, setData2] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const response1 = await fetch(props.filename1);
            const json1 = await response1.json();
            setData1(json1);

            const response2 = await fetch(props.filename2);
            const json2 = await response2.json();
            setData2(json2);
        };

        loadData();
        }, [props.filename1, props.filename2]);

    useEffect(() => {
        const loadWasm = async () => {
            try {
                const response = await fetch('@/../pkg/uamutations_bg.wasm');
                const wasmModule = await WebAssembly.instantiateStreaming(response);
                setWasmModule(wasmModule);
                // if (data1 && data2) {
                //     const wasm_binary = wasm_js.initSync(bytes);
                //     const varname = props.varnames.join(",");
                //     const resultJson = wasm_js.uamutate(JSON.stringify(data1), JSON.stringify(data2), props.varname, props.nentries);
                //     const resultObj = JSON.parse(resultJson);
                //     handleResultChange(resultObj);
                //     if (geoJSONcontent && geoJSONcontent.feature) {
                //         geoJSONcontent.feature.forEach((feature: any, index: any) => {
                //             if (feature.properties.name === props.varnames[0]) {
                //                 feature.properties[props.varnames[index]] = resultObj[index];
                //             }
                //         });
                //     }
                //     setGeoJSONcontent(geoJSONcontent);
                // }
            } catch (err) {
                console.error(`Unexpected error in loadWasm. [Message: ${err.message}]`);
            }
        };
        loadWasm();
    }, [data1, data2, props.varnames, props.nentries, props.geoJSONcontent, props.setGeoJSONcontent, props.handleResultChange]);

    const layers = [
        new GeoJsonLayer({
            id: 'polygon-layer',
            data: props.geoJSONcontent,
            filled: true,
            stroked: true,
            getLineWidth: 10,
            getLineColor: [122, 122, 122],
            getFillColor: d => {
                var layerval = Math.max (layer_min, Math.min (layer_max, d.properties?.[props.this_layer]));
                if (isNaN(layerval)) {
                    layerval = layer_min;
                }
                // Invert the palette:
                layerval = layer_min + (layer_max - layerval);
                const layerarr: any = d3.color(Color(layerval));
                var red = 0, green = 0, blue = 0;
                if (layerarr) {
                    red = layerarr.r;
                    green = layerarr.g;
                    blue = layerarr.b;
                }
                return [red, green, blue]
                },
            opacity: 1 - props.alpha,
            updateTriggers: {
                getFillColor: [props.this_layer]
            }
            })
        ]

    return (
        <>
        {(
            <DeckGL
                width={"100vw"}
                height={"100vh"}
                controller={true}
                layers={layers}
                initialViewState={props.viewState}
            >
            <Map
                mapStyle={props.MAP_STYLE}
                mapboxAccessToken={props.MapboxAccessToken}
            >
            </Map>
            </DeckGL>
        )}
        </>
    )
}

export default MapMutateComponent;
