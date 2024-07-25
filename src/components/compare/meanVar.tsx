import { ChangeEvent, useEffect, useState } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import styles from '@/styles/controls.module.css';

interface meanVarProps {
    meanVals: boolean,
    singleLayer: boolean,
    handleMeanChange: (mn: boolean) => void
}

export default function MeanVarButtons(props: meanVarProps) {

    const [mean, setMean] = useState(true);
    useEffect(() => {
        const meanState = props.meanVals || !props.singleLayer;
        setMean(meanState);
    }, [props.meanVals, props.singleLayer]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMean((event.target as HTMLInputElement).value === "average");
        props.handleMeanChange(mean);
    }

    return (
        <>
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="average"
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel value="average" control={<Radio />} label="Avg." />
                    <FormControlLabel value="variation" control={<Radio />} label="Var." />
                </RadioGroup>
            </FormControl>
        </>
    );
};
