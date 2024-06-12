
import { useState } from 'react';
import styles from '@/styles/controls.module.css';
import { ExplainButtonProps } from "@/data/interfaces";
import tourStyles from '@/styles/tour.module.css';

interface HelpButtonProps {
    handleTourOpen: (isTourOpen: boolean) => void
}

export default function HelpButton (props: HelpButtonProps) {

    var buttonStyle: any = styles.explainbuttonOff;
    var buttonText: string = "Help";

    return (
        <section className="button">
            <button
                className={buttonStyle}
                type="button"
                onClick={() => props.handleTourOpen(true)}
            >{buttonText}</button>
        </section>
    )
}
