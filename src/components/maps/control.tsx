
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/controls.module.css';
import CityList from '@/components/maps/citylist';
import LayerList from '@/components/maps/layerlist';
import OpacitySlider from '@/components/maps/slider';
import { ControlProps } from "@/data/interfaces";

export default function Control (props: ControlProps) {

    const [cityData, setCityData] = useState(props.citiesArray[props.idx]);

    const cityNames = props.citiesArray.map((item) => item.name);

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    return (
        <>
        <div id="top-left-container" className={styles.controls}>
            <div id="divinfo" style={{display: hideControls?"none":""}}>

            <button
                id="btnHideControls"
                className="btn-transparent right-align"
                onClick={() => handleControlsVisibility(true)}
            >
                X
            </button>


            <h2>UTA</h2>

            <h3>City</h3>
            <CityList
                citiesArray={props.citiesArray}
                idx={props.idx}
                viewState = {props.viewState}
                handleIdxChange={props.handleIdxChange}
                handleViewStateChange={props.handleViewStateChange}
                // onSelect={city => props.handleIdxChange(props.idx)}
            />
            <h3>Layer</h3>
            <LayerList
                layer = {props.layer}
                handleLayerChange = {props.handleLayerChange}
            />
            <h3>Opacity</h3>
            <OpacitySlider
                alpha = {props.alpha}
                handleAlphaChange={props.handleAlphaChange}
            />
            </div>

            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>

        </div>
        </>
        )
};
