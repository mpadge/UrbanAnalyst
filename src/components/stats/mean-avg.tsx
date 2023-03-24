
import styles from '@/styles/controls.module.css';

const MeanAvgButtons = () => {
    return (
        <section className="radioButtons">
            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="A"
                    id="a"
                />
                Average
            </label>
            <br/>

            <label className={styles.radioButton}>
                <input
                    type="radio"
                    name="meanVar"
                    value="B"
                    id="b"
                />
                Variation
            </label>
        </section>
    );
};

export default MeanAvgButtons;
