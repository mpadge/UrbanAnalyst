
import React, { useState } from 'react';

import { NumLayersProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function SelectNumLayers(props: NumLayersProps) {

    return (
        <section className={styles.numLayersSelect}>
            {props.numLayersOptions.map((category: string) => (
                <button
                    key={category}
                    type="button"
                    style={{
                        backgroundColor: category === props.numLayers ? "" : "white" ,
                        color: category === props.numLayers ? "" : "black"
                    }}
                    //className={styles.buttonGroup}
                    onClick={(event) => { 
                        props.handleNumLayersChange(category);
                    }}
                >
                    {category}
                </button>
            ))}
        </section>
    )
}
