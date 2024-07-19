
import styles from '@/styles/controls.module.css';

interface meanVarProps {
    meanVals: boolean,
    singleLayer: boolean,
    handleMeanChange: (mn: boolean) => void
}

export default function meanVarButtons(props: meanVarProps) {

    return (
        <section className={styles.radioButtons}>
            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="Average"
                    id="average"
                    checked={props.meanVals || !props.singleLayer}
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
                    checked={!props.meanVals && props.singleLayer}
                    onChange={() => props.handleMeanChange(props.meanVals)}
                />
                Variation
            </label>
        </section>
    );
};
