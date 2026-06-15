"use client"

import { useState } from "react";

import Control from '@/components/summarise/control';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';
import { localStorageHelpers } from '@/components/utils/localStorageUtils';

export default function SummarisePage(): JSX.Element {

    const [idx, setIdx] = useState(() => {
        const stored = localStorageHelpers.getItem('uaCityIdx');
        if (!stored) return 0;
        const parsed = parseInt(stored, 10);
        return isNaN(parsed) ? 0 : parsed;
    });

    const contentArray = Content();

    const _contentNames = contentArray.map(element => element.name);
    const contentHtml = contentArray.map(element => element.content);

    const handleIdxChange = (idx: number): void => {
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
