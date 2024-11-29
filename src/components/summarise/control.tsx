
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link'
import Image from "next/image"
import localFont from 'next/font/local'

import Tooltip from '@mui/material/Tooltip';

import styles from '@/styles/controls.module.css';
import CityList from '@/components/summarise/cityList';

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
    const [controlStyle, setControStyle] = useState(styles.light);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setControStyle(dark ? styles.dark : styles.light);
        }
    }, []);
    const [uaLogo, setUaLogo] = useState('/ua.svg');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setUaLogo(dark ? '/ua-dark.svg' : 'ua.svg');
        }
    }, []);

    return (
        <>
            <div id="top-left-container" className={`${styles.controls} ${controlStyle} ${junctionFont.className}`}>
                <div id="divinfo" style={{display: hideControls?"none":""}}>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        marginLeft: '2px',
                        marginTop: '2px',
                        marginBottom: '16px'
                    }}>
                    <Tooltip title="Click to close controls">
                    <button
                        id="btnHideControls"
                        className="btn-transparent right-align"
                        onClick={() => handleControlsVisibility(true)}
                    >
                        <Image
                            src={uaLogo}
                            alt="UA Logo"
                            width={20}
                            height={20}
                            style={{
                                maxWidth: "100%"
                            }}
                        />
                    </button>
                    </Tooltip>
                    </div>

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
