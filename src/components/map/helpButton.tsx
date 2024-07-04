
import { useState } from 'react';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import styles from '@/styles/controls.module.css';
import { ExplainButtonProps } from "@/data/interfaces";
import tourStyles from '@/styles/tour.module.css';

interface HelpButtonProps {
    handleTourOpen: (isTourOpen: boolean) => void
}

export default function HelpButton (props: HelpButtonProps) {

    var buttonStyle: any = styles.explainbuttonOff;
    var buttonText: string = "Help";

    return (
        <Stack alignItems="center">
            <Button
                variant="outlined"
                onClick={() => props.handleTourOpen(true)}
            >{buttonText}</Button>
        </Stack>
    )
}
