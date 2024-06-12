
import styles from '@/styles/controls.module.css';
import { LayersButtonProps } from "@/data/interfaces";

export default function LayersButton (props: LayersButtonProps) {

    var buttonStyleTemp: any = styles.explainbuttonOff;
    var buttonTextTemp: string = "Extra Layers";
    if (props.showLayersDialog) {
        buttonStyleTemp = styles.explainbuttonOn;
        buttonTextTemp = "Close Layers";
    }
    const buttonStyle = buttonStyleTemp;
    const buttonText = buttonTextTemp;

    const toggleDialog = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        props.handleLayersDialogVisibility(props.showLayersDialog)
    }

    return (
        <section className="button">
            <button
                className={buttonStyle}
                type="button"
                onClick={(event: React.MouseEvent) => toggleDialog(event)}
            >{buttonText}</button>
        </section>
    )
}
