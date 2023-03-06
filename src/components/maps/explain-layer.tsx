import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { ExplainProps } from "@/data/interfaces";

export default function ExplainButton (props: ExplainProps) {

    return (
        <div id="explain-layer" className={styles.explaintext}>
            <div id="divinfo" style={{display: props.explain?"":"none"}} >
                <p>
                    The combination of multi-modal travel times relative to
                    equivalent automobile times, and the social index
                    transformed to the same scale. Values less than one indicate
                    that relative travel times effectively counteract
                    socio-demographic disadvantage, while values greater than
                    one indicate that lack of transport provision exacerbates
                    social inequality.
                </p>
                <p>(Click anywhere to close.)</p>
            </div>
        </div>
    )
}
