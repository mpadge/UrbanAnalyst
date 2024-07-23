import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styles from '@/styles/controls.module.css';

interface ResetButtonProps {
    handleReset: () => void
}

export default function ResetButton (props: ResetButtonProps) {

    var buttonStyle: any = styles.explainbuttonOff;
    var buttonText: string = "Reset";

    return (
        <Stack alignItems="center">
            <Button
                variant="outlined"
                onClick={() => props.handleReset()}
            >
                {buttonText}
            </Button>
        </Stack>
    )
}
