
import styles from '@/styles/controls.module.css';

interface ResetButtonProps {
    handleReset: () => void
}

export default function ResetButton (props: ResetButtonProps) {

    var buttonStyle: any = styles.explainbuttonOff;
    var buttonText: string = "Reset";

    return (
        <section className="button">
            <button
                className={buttonStyle}
                type="button"
                onClick={() => props.handleReset()}
            >{buttonText}</button>
        </section>
    )
}
