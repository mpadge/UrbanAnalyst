import { useEffect, useState} from 'react';
import { DeckGL } from "@deck.gl/react/typed";
import { Map } from "react-map-gl";

import { ViewState } from "@/data/interfaces";
import TransformMsgs from '@/components/transform/PageMessages';
import { loadDataFunction } from '@/components/transform/LoadData';
import { transformDataFunction } from '@/components/transform/CallTransform';
import { getGeoJsonLayer } from '@/components/transform/GeoJsonLayer';

interface TransformProps {
    idx: number
    idx2: number
    varnames: string[]
    calculate: boolean,
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
    const [mapPathSource, setMapPathSource] = useState<string>("");
    const [data1, setData1] = useState<number | null>(null);
    const [data2, setData2] = useState<number | null>(null);
    const [result, setResult] = useState<number[] | null>(null);
    const [geoJSONcontent, setGeoJSONcontent] = useState<any>(null)
    const [layer, setLayer] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [calculating, setCalculating] = useState<boolean>(false);

    useEffect(() => {
        const mapPathSource = "/data/" + props.city + "/data.json";
        setMapPathSource(mapPathSource);
    }, [props.city]);

    // Effect to load 'dataraw' point-based data for source and target cities.
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
    // vector of aggregaed mean differences in each polygon of source city. This
    // vector is stored in the column of 'result' corresponding to
    // 'props.varnames[0]'.
    useEffect(() => {
        const handleResultChange = (result: any) => {
            setResult(result);
        }
        transformDataFunction(data1, data2, props.varnames, handleResultChange);
        }, [data1, data2, props.varnames, setResult]);

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
        const handleLayerChange = (layer: any) => {
            setLayer(layer);
        }
        getGeoJsonLayer(geoJSONcontent, props.layerMin, props.layerMax, varname, props.alpha, handleLayerChange);
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
