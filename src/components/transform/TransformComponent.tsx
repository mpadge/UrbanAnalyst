import { useEffect, useState} from 'react';
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import { ViewState, CityDataProps } from "@/data/interfaces";
import TransformMsgs from '@/components/transform/PageMessages';
import { loadDataFunction } from '@/components/transform/LoadData';
import { transformDataFunction } from '@/components/transform/CallTransform';
import { getGeoJsonLayer } from '@/components/transform/GeoJsonLayer';

interface TransformProps {
    idx: number
    idx2: number
    layer: string
    varnames: string[]
    calculate: boolean,
    citiesArray: CityDataProps[],
    city: string
    targetCity: string
    viewState: ViewState
    alpha: number
    layerMin: number
    layerMax: number
    outputLayer: string
    handleLayerMinChange: (layerMin: number) => void
    handleLayerMaxChange: (layerMin: number) => void
    handleCalculateChange: (calculate: boolean) => void
    handleOutputLayerChange: (outputLayer: string) => void
}

const MapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const MAP_STYLE = "mapbox://styles/mapbox/light-v10"

const TransformComponent = (props: TransformProps) => {
    // -------- state variables --------
    const [mapPathSource, setMapPathSource] = useState<string>("");
    const [data1, setData1] = useState<number | null>(null);
    const [data2, setData2] = useState<number | null>(null);
    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [geoJsonLayer, setGeoJsonLayer] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [calculated, setCalculated] = useState<boolean>(true);

    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
    }, [props.city]);

    // Effect to load 'dataraw' point-based data for source and target cities.
    useEffect(() => {
        if (!props.calculate) return;
        loadDataFunction(props.city, props.targetCity, setData1, setData2);
        }, [props.calculate, props.city, props.targetCity, setData1, setData2]);

    // Effect to pass 'data1', 'data2' to WASM mutation algorithm, and return
    // vector of aggregaed mean differences in each polygon of source city. This
    // vector is stored in the column of 'result' corresponding to
    // 'varnames[0]'.
    useEffect(() => {
        const varnames: string[] = [props.layer, ...props.varnames];
        transformDataFunction(data1, data2, varnames, props.outputLayer, setResult);
        }, [data1, data2, props.layer, props.varnames, props.outputLayer, setResult]);

    // Effect to load map data for source city, and replace specified column
    // with 'result' from previous effect:
    useEffect(() => {
        fetch(mapPathSource)
        .then(response => response.json())
        .then(data => {
            data.features.forEach((feature: any, index: number) => {
                if (result) { // needed here because 'result' can still be null
                    feature.properties[props.layer] = result[index];
                }
            });
            setGeoJSONcontent(data);
        })
        .catch((error) => console.error('Error:', error));
    }, [mapPathSource, result, props.layer]);

    const { handleLayerMinChange, handleLayerMaxChange } = props;
    useEffect(() => {
        if (result) {
            var min: number;
            var max: number;
            if (props.outputLayer === "original") {
                // Get data ranges from original CITY_DATA array:
                min = props.citiesArray[props.idx].dataRanges[props.layer as string][0];
                max = props.citiesArray[props.idx].dataRanges[props.layer as string][1];
                // And then implement transformations from wasm/src/transform:
                if (props.layer === "bike_index" || props.layer === "nature_index") {
                    const tmp = 1.0 - min;
                    min = 1.0 - max;
                    max = tmp;
                }
            } else {
                min = Math.min(...result.filter(value => value !== 0));
                max = Math.max(...result);
            }
            handleLayerMinChange(min);
            handleLayerMaxChange(max);
        }
    }, [result, props.citiesArray, props.idx, props.layer, props.outputLayer, handleLayerMinChange, handleLayerMaxChange]);

    useEffect(() => {
        getGeoJsonLayer(geoJSONcontent, props.layerMin, props.layerMax, props.layer, props.alpha, setGeoJsonLayer);
    }, [props.layerMin, props.layerMax, props.layer, props.alpha, geoJSONcontent]);

    useEffect(() => {
        if (data1 && data2) {
            setLoading(false);
            setCalculating(true);
        }
    }, [data1, data2, setLoading, setCalculating]);

    const { handleCalculateChange } = props;
    useEffect(() => {
        if (geoJsonLayer) {
            setCalculating(false);
            handleCalculateChange(false);
        }
    }, [geoJsonLayer, setCalculating, handleCalculateChange]);

    return (
        <>
        {loading ? <TransformMsgs msg='Loading ...' /> :
            calculating ? <TransformMsgs msg='Calculating ...' /> : null}
        <DeckGL
            width={"100vw"}
            height={"100vh"}
            controller={true}
            layers={geoJsonLayer}
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
