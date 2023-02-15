
import {NextPage} from "next";
import {useState} from "react";
import {GeoJsonLayer} from "@deck.gl/layers/typed";
import {DeckGL} from "@deck.gl/react/typed";
import {Map} from "react-map-gl";
import Control from '@/components/control';
import UTAMap from '@/components/map';

import { paletteInferno } from "@/components/palettes";
import { CITY_DATA, DEFAULT_MAP_CONFIG } from '@/components/citydata';
import { CityDataProps, CitiesDataProps, ViewState } from "@/components/interfaces";

const Page: NextPage<CitiesDataProps> = (props: CitiesDataProps) => {

    const [idx, setIdx] = useState(0);
    const [cityData, setCityData] = useState(props.citiesArray[idx]);
    const [viewState, setViewState] = useState({...props.citiesArray[idx].initialViewState,
        pitch: 0,
        bearing: 0 });

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }
    const handleViewStateChange = (pViewState: any) => {
        setViewState((prevViewState) => { return { ...prevViewState, ...pViewState }; });
        //setViewState(pViewState);
    }

    console.log('In index: ViewState lon = ' + viewState.longitude);

    return (
        <>
        <UTAMap
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleViewStateChange = {handleViewStateChange}
        />
        <Control
            idx = {idx}
            citiesArray = {props.citiesArray}
            viewState = {viewState}
            handleIdxChange = {handleIdxChange}
            handleViewStateChange = {handleViewStateChange}
        />
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
