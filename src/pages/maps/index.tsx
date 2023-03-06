
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
import Buttons from '@/components/maps/buttons';

import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/data/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/data/interfaces";

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

    // click event to close Explain text:
    const handleClick = (e) => {
        if (explain) {
            setExplain(false);
        }
    }

    return (
        <>
        <Head>
            <title>UTA Maps</title>
            <meta name="description" content="Maps for Urban Transport Analyst" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/uta.ico" />
        </Head>
        <div onClick={(e) => handleClick(e)}>
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
        <Buttons />
        </div>
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
