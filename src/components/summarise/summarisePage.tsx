"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import Control from '@/components/summarise/control';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';
import { localStorageHelpers } from '@/components/utils/localStorageUtils';

export default function SummarisePage(): JSX.Element {

    const searchParams = useSearchParams();
    const [urlData] = useState<{ hasFullQuery: boolean; idx: number }>(() => {
        if (searchParams?.has('idx')) {
            const urlIdx = parseInt(searchParams.get('idx')!, 10);
            const val = isNaN(urlIdx) ? 0 : urlIdx;
            localStorageHelpers.setItem('uaCityIdx', val.toString());
            return { hasFullQuery: true, idx: val };
        }
        const stored = localStorageHelpers.getItem('uaCityIdx');
        const parsed = parseInt(stored ?? '', 10);
        return { hasFullQuery: false, idx: isNaN(parsed) ? 0 : parsed };
    });
    const hasFullQuery = urlData.hasFullQuery;
    const [idx, setIdx] = useState(urlData.idx);

    useEffect(() => {
        if (hasFullQuery) return;
        window.history.replaceState(null, '', `?idx=${idx}`);
    }, [hasFullQuery, idx]);

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
