
import {useState} from 'react';
import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/controls.module.css';
import LayerList from '@/components/stats/layerlist';
import ExplainButton from '@/components/stats/explain-button';
import ExplainLayer from '@/components/stats/explain-layer';
import { StatsControlProps } from "@/data/interfaces";

export default function Control (props: StatsControlProps) {

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

            <h3>
            <Image
            src="/uta.svg"
            alt="UTA Logo"
            // className={styles.vercelLogo}
            width={100}
            height={50}
            />
            </h3>

            <h3>Layer</h3>
            <LayerList
                layer = {props.layer}
                handleLayerChange = {props.handleLayerChange}
            />
            <ExplainButton
                explain = {props.explain}
                handleExplainChange = {props.handleExplainChange} />
            </div>

            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>

        </div>
        <ExplainLayer
            idx={props.idx}
            layer = {props.layer}
            explain = {props.explain}
            citiesArray={props.citiesArray}
        />
        </>
        )
};
