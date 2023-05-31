
import Head from 'next/head'
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {FlyToInterpolator} from "@deck.gl/core/typed";
import {Map} from "react-map-gl";
import Control from '@/components/maps/control';
import Legend from '@/components/maps/legend';
import UTAMap from '@/components/maps/map';
import Buttons from '@/components/buttons2';
import PageHeadingText from "@/components/heading_text";
import styles from '@/styles/maps.module.css';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/data/interfaces";

const buttonProps = {
    first: "home",
    second: "stats"
}

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
    const [viewState, setViewState] = useState({
        ...props.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator()
    });
    const [layer, setLayer] = useState("social_index");
    const [layer2, setLayer2] = useState("");
    const [alpha, setAlpha] = useState(0.5);
    const [explain, setExplain] = useState(false);
    const [numLayers, setNumLayers] = useState("Single");
    const numLayersOptions = ["Single", "Paired"];

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleAlphaChange = (alpha: number) => {
        setAlpha(alpha);
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
        //setViewState(pViewState);
    }
    const handleLayerChange = (layer: string) => {
        setLayer(layer);
    }
    const handleLayer2Change = (layer2: string) => {
        setLayer2(layer2);
    }
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }
    const handleNumLayersChange = (numLayers: string) => {
        setNumLayers(numLayers);
    }

    const paired_keys = Object.keys(props.citiesArray[idx].dataIntervalsPaired);
    const layer1: string = layer.replace("\_", "").replace("index", "");
    const layer2fmt: string = layer2.replace("\_", "").replace("index", "");
    const these_layers =
        paired_keys.includes(layer1 + "_" + layer2fmt) ?
        layer1 + "_" + layer2fmt : layer2fmt + "_" + layer1;
    const dual_layers: boolean = paired_keys.includes(these_layers);
    const this_layer: string = numLayers == "Paired" && dual_layers ?
        these_layers : layer;

    const heading: string = numLayers == "Paired" && dual_layers ?
        PageHeadingText(layer1) + " & " + PageHeadingText(layer2) :
        PageHeadingText(layer1);

    // console.log("LAYER1: " + layer1 + ", LAYER2: " + layer2fmt + "; HD1: " +
    //     PageHeadingText(layer1) + ", HD2: " + PageHeadingText(layer2fmt) +
    //     " -> " + heading);

    // meta viewport from:
    // https://docs.mapbox.com/mapbox-gl-js/example/disable-scroll-zoom/

    return (
        <>
        <Head>
            <title>UTA Maps</title>
            <meta name="description" content="Maps for Urban Transport Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="viewport"
                content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            <link rel="icon" href="/uta.ico" />
        </Head>
        <div id="divinfo" style={{display: explain?"none":""}} >
            <div id="stats-heading" className={styles.mapsheading}>
                <p> {heading} </p>
            </div>
        </div>
        <UTAMap
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            alpha = {alpha}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleLayer2Change = {handleLayer2Change}
        />
        <Control
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            numLayersOptions = {numLayersOptions}
            alpha = {alpha}
            explain = {explain}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleIdxChange = {handleIdxChange}
            handleNumLayersChange = {handleNumLayersChange}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleLayer2Change = {handleLayer2Change}
            handleExplainChange = {handleExplainChange}
        />
        <Legend
            idx = {idx}
            layer = {layer}
            layer2 = {layer2}
            numLayers = {numLayers}
            alpha = {alpha}
            citiesArray = {props.citiesArray}
        />
        <Buttons buttons={buttonProps} />
        </>
        )
};
export default Page;

export async function getStaticProps() {

    const city_data = CITY_DATA;

    return {
        props: {
            citiesArray: city_data.citiesArray
        }
    }
}
