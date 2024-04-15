"use client"

import { useEffect, useState } from "react";

import Control from '@/components/summarise/control';
import Buttons from '@/components/buttons3';
import useWindowSize from '@/components/window-size';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';

const buttonProps = {
    first: "home",
    second: "compare",
    third: "transform"
}

export default function SummarisePage() {

    const [idx, setIdx] = useState(0);
    const contentArray = Content();

    const contentNames = contentArray.map(element => element.name);
    const contentHtml = contentArray.map(element => element.content);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
    }

    return (
        <>
            <div className={styles.summarise}>
                {contentHtml[idx]}
            </div>
        </>
    )
}
