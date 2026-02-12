"use client"

import { useEffect, useState } from "react";

import Control from '@/components/summarise/control';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';
import { localStorageHelpers } from '@/components/utils/localStorageUtils';

export default function SummarisePage(): JSX.Element {

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        var idxLocal = 0;
        const storedIdx = localStorageHelpers.getItem('uaCityIdx');
        if(storedIdx) {
            idxLocal = parseInt(storedIdx, 10);
            if (isNaN(idxLocal)) {
                idxLocal = 0;
            }
        }
        setIdx(idxLocal);
    }, [])

    const contentArray = Content();

    const _contentNames = contentArray.map(element => element.name);
    const contentHtml = contentArray.map(element => element.content);

    const handleIdxChange = (idx: number) => {
        setIdx(idx);
        localStorageHelpers.setItem("uaCityIdx", idx.toString());
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
