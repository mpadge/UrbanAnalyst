"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';

import Control from '@/components/summarise/control';
import styles from '@/styles/summarise.module.css';
import Content from '@/components/summarise/citySummaryData';
import { localStorageHelpers } from '@/components/utils/localStorageUtils';

export default function SummarisePage(): JSX.Element {

    const searchParams = useSearchParams();
    const contentArray = Content();

    const [urlData] = useState<{ hasFullQuery: boolean; idx: number }>(() => {
        if (searchParams?.has('city')) {
            const cityName = searchParams.get('city')!;
            const found = Content().findIndex(c => c.name === cityName);
            const val = found >= 0 ? found : 0;
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
        const cityName = contentArray[idx]?.name ?? '';
        window.history.replaceState(null, '', `?city=${cityName}`);
    }, [hasFullQuery, idx, contentArray]);

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
