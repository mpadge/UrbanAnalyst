
import { useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import styles from '@/styles/controls.module.css';
import CityList from '@/components/summarise/citylist';

const junctionFont = localFont({ src: '../../app/junction-regular.woff' })

interface SummariseControlProps {
    idx: number,
    handleIdxChange: (pIdx: number) => void
}


export default function Control (props: SummariseControlProps) {

    const [hideControls, setHideControls] = useState(false);
    const handleControlsVisibility = (pHideControls: boolean) => {
        setHideControls(pHideControls);
    }

    return (
        <>
        <div id="top-left-container" className={`${styles.controls} ${junctionFont.className}`}>
            <div id="divinfo" style={{display: hideControls?"none":""}}>

            <div style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                marginLeft: '2px',
                marginTop: '2px',
                marginBottom: '2px'
            }}>
            <button
                id="btnHideControls"
                className="btn-transparent right-align"
                onClick={() => handleControlsVisibility(true)}
            >
                X
            </button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                marginLeft: '20px',
                marginTop: '0px',
                marginBottom: '10px'
            }}>

            <Image
                src="/ua.svg"
                alt="UA Logo"
                width={100}
                height={50}
                style={{
                    maxWidth: "100%",
                    height: "auto"
                }}
            />
            </div>

            <h3>City</h3>
            <CityList
                idx={props.idx}
                handleIdxChange={props.handleIdxChange}
            />
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'left',
                marginLeft: '2px',
                marginTop: '2px',
                marginBottom: '2px'
            }}>
            <button
                id="btnShowControls"
                style={{display:hideControls?"":"none"}}
                onClick={() => handleControlsVisibility(false)}
            >Show Controls</button>
            </div>

        </div>
        </>
        )
};
