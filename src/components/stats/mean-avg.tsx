
import styles from '@/styles/controls.module.css';

interface MeanAvgProps {
    meanVals: boolean,
    handleMeanChange: (mn: boolean) => void
}

export default function MeanAvgButtons(props: MeanAvgProps) {

    return (
        <section className={styles.radioButtons}>
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
