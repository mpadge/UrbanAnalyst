
import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { ExplainButtonProps } from "@/data/interfaces";

export default function ExplainButton (props: ExplainButtonProps) {

    return (
    <section className="button">
    <button
        className={styles.explainbutton}
        type="button"
        onClick={() => props.handleExplainChange(props.explain)}
    >Explain Layer</button>
    </section>
    )
}
