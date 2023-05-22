
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
    const [alpha, setAlpha] = useState(0.5);
    const [explain, setExplain] = useState(false);

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
    const handleExplainChange = (e: any) => {
        setExplain(!explain);
    }

    var layer_temp: string = layer;

    if (layer == "social_index") {
        layer_temp = "Social";
    } else if (layer == "times_rel") {
        layer_temp = "Transport Rel.";
    } else if (layer == "times_abs") {
        layer_temp = "Transport Abs.";
    } else if (layer == "transfers") {
        layer_temp = "Num. Transfers";
    } else if (layer == "intervals") {
        layer_temp = "Transp. Interval";
    } else if (layer == "transport") {
        layer_temp = "Transport Combined";
    } else if (layer == "popdens") {
        layer_temp = "Population";
    } else if (layer == "school_dist") {
        layer_temp = "School Dist.";
    } else if (layer == "bike_index") {
        layer_temp = "Bicycle Index";
    } else if (layer == "natural") {
        layer_temp = "Nature Index";
    } else if (layer == "parking") {
        layer_temp = "Parking";
    }

    const layer_text = layer_temp;

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
                <p> {layer_text} </p>
            </div>
        </div>
        <UTAMap
            idx = {idx}
            layer = {layer}
            alpha = {alpha}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
        />
        <Control
            idx = {idx}
            layer = {layer}
            alpha = {alpha}
            explain = {explain}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleIdxChange = {handleIdxChange}
            handleAlphaChange = {handleAlphaChange}
            handleViewStateChange = {handleViewStateChange}
            handleLayerChange = {handleLayerChange}
            handleExplainChange = {handleExplainChange}
        />
        <Legend
            idx = {idx}
            layer = {layer}
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
