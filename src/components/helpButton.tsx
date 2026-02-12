import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface HelpButtonProps {
    handleTourOpen: (isTourOpen: boolean) => void
}

export default function HelpButton (props: HelpButtonProps): JSX.Element {

    var buttonText: string = "Help";

    return (
        <Stack alignItems="center">
            <Button
                size="small"
                variant="outlined"
                onClick={() => props.handleTourOpen(true)}
            >{buttonText}</Button>
        </Stack>
    )
}
