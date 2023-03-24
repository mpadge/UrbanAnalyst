
import { MeanAvgProps } from "@/data/interfaces";
import styles from '@/styles/controls.module.css';

export default function MeanAvgButtons(props: MeanAvgProps) {

    return (
        <section className="radioButtons">
            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="Average"
                    id="average"
                    checked={props.meanVals}
                    onChange={() => props.handleMeanChange(props.meanVals)}
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
                    onChange={() => props.handleMeanChange(props.meanVals)}
                />
                Variation
            </label>
        </section>
    );
};
