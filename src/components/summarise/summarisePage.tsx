"use client"

import { useEffect, useState } from "react";

import Control from '@/components/summarise/control';
import useWindowSize from '@/components/windowSize';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';

export default function SummarisePage() {

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        var idxLocal = 0;
        if (typeof window != "undefined") {
            const storedIdx = localStorage.getItem('uaCityIdx');
            if(storedIdx) {
                idxLocal = parseInt(storedIdx, 10);
                if (isNaN(idxLocal)) {
                    idxLocal = 0;
                }
            }
        }
        setIdx(idxLocal);
    }, [])

    const contentArray = Content();

    const contentNames = contentArray.map(element => element.name);
    const contentHtml = contentArray.map(element => element.content);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
        if (typeof window != "undefined") {
            localStorage.setItem("uaCityIdx", idx.toString());
        }
    }

    return (
        <>
            <div className={styles.summarise}>
                {contentHtml[idx]}
                <Control
                    idx={idx}
                    handleIdxChange={handleIdxChange}
                />
            </div>
        </>
    )
}
