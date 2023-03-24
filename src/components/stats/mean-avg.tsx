
import { MeanAvgProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function MeanAvgButtons(props: MeanAvgProps) {
    console.log("meanVals = " + props.meanVals)
    return (
        <section className="radioButtons">
            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="Average"
                    id="average"
                    checked={props.meanVals}
                    onChange={props.handleMeanChange}
                />
                Average
            </label>
            <br/>

            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="Variation"
                    id="variation"
                    checked={!props.meanVals}
                    onChange={props.handleMeanChange}
                />
                Variation
            </label>
        </section>
    );
};
