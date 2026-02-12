import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface ResetButtonProps {
    handleReset: () => void
}

export default function ResetButton (props: ResetButtonProps): JSX.Element {

    const buttonText: string = "Reset";

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
