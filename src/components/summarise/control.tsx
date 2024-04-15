
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

    return (
        <>
        <div id="top-left-container" className={`${styles.controls} ${junctionFont.className}`}>
            <p>
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
            </p>

            <h3>City</h3>
            <CityList
                idx={props.idx}
                handleIdxChange={props.handleIdxChange}
            />
        </div>
        </>
        )
};
