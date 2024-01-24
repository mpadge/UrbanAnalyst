import { useEffect, useState} from 'react';
import * as d3 from 'd3';
import 'd3-scale-chromatic';
import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import * as wasm_js from '@/../pkg/uamutations.js';
import styles from '@/styles/maps.module.css';
import { ViewState, CityDataProps } from "@/data/interfaces";
import TransformMsgs from '@/components/transform/PageMessages';
import { loadDataFunction } from '@/components/transform/LoadData';
import { transformDataFunction } from '@/components/transform/CallTransform';

interface TransformProps {
    idx: number
    idx2: number
    varnames: string[]
    calculate: boolean,
    nentries: number
    city: string
    targetCity: string
    viewState: ViewState
    alpha: number
    layerMin: number
    layerMax: number
    handleLayerMinChange: (layerMin: number) => void
    handleLayerMaxChange: (layerMin: number) => void
    handleCalculateChange: (calculate: boolean) => void
}

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

const TransformComponent = (props: TransformProps) => {
    const [data1, setData1] = useState<number | null>(null);
    const [data2, setData2] = useState<number | null>(null);

    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [layer, setLayer] = useState<any>(null)

    const [loading, setLoading] = useState<boolean>(true);
    const [calculating, setCalculating] = useState<boolean>(false);

    const [mapPathSource, setMapPathSource] = useState<string>("");
    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
    }, [props.city]);

    // Effect to load 'dataraw' point-based data for source and target cities,
    // and store as 'data1', 'data2':
    useEffect(() => {
        const handleData1Change = (data: number | null) => {
            setData1(data);
        }
        const handleData2Change = (data: number | null) => {
            setData2(data);
        }
        loadDataFunction(props.city, props.targetCity, handleData1Change, handleData2Change);
        }, [props.city, props.targetCity, setData1, setData2]);

    // Effect to pass 'data1', 'data2' to WASM mutation algorithm, and return
    // vector of aggregaed mean differences in each polygon of source city.
    useEffect(() => {
        const handleResultChange = (result: any) => {
            setResult(result);
        }
        transformDataFunction(data1, data2, props.varnames, props.nentries, handleResultChange);
        }, [data1, data2, props.varnames, props.nentries, setResult]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    const varname = props.varnames[0];
    useEffect(() => {
        fetch(mapPathSource)
        .then(response => response.json())
        .then(data => {
            data.features.forEach((feature: any, index: number) => {
                if (result) { // needed here because 'result' can still be null
                    feature.properties[varname] = result[index];
                }
            });
            setGeoJSONcontent(data);
        })
        .catch((error) => console.error('Error:', error));
    }, [mapPathSource, result, varname]);

    // Effect to get min + max values of 'result' and store as 'layerMin',
    // 'layerMax':
    const { handleLayerMinChange, handleLayerMaxChange } = props;
    useEffect(() => {
        if (result) {
            const min = Math.min(...result);
            const max = Math.max(...result);
            handleLayerMinChange(min);
            handleLayerMaxChange(max);
        }
    }, [result, handleLayerMinChange, handleLayerMaxChange]);

    useEffect(() => {
        let Color = d3
            .scaleSequential()
            .domain([props.layerMin, props.layerMax])
            .interpolator(d3.interpolateViridis);

        const this_layer = [
            new GeoJsonLayer({
                id: 'polygon-layer',
                data: geoJSONcontent,
                filled: true,
                stroked: true,
                getLineWidth: 10,
                getLineColor: [122, 122, 122],
                getFillColor: d => {
                    var layerval = Math.max (props.layerMin, Math.min (props.layerMax, d.properties?.[varname]));
                    if (isNaN(layerval)) {
                        layerval = props.layerMin;
                    }
                    // Invert the palette:
                    layerval = props.layerMin + (props.layerMax - layerval);
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
                    getFillColor: [varname]
                }
                })
            ]

        setLayer(this_layer)
    }, [props.layerMin, props.layerMax, varname, props.alpha, geoJSONcontent]);

    useEffect(() => {
        if (data1 && data2) {
            setLoading(false);
            setCalculating(true);
        }
    }, [data1, data2]);

    useEffect(() => {
        if (layer) {
            setCalculating(false);
        }
    }, [layer]);

    return (
        <>
        {loading ? <TransformMsgs msg='Loading ...' /> :
            calculating ? <TransformMsgs msg='Calculating ...' /> : null}
        <DeckGL
            width={"100vw"}
            height={"100vh"}
            controller={true}
            layers={layer}
            initialViewState={props.viewState}
        >
        <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MapboxAccessToken}
        >
        </Map>
        </DeckGL>
        </>
    )
}

export default TransformComponent;
