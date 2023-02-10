
import {useState} from 'react';
import {ControlBoxProps} from './data-interfaces';
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import control from '@/styles/Control.css'

const Control = (props:ControlBoxProps) => {

  const [hideInfoBox, setHideInfoBox] = useState(false);

    return (
        <div id="top-left-container" className={styles.topleft}>
        <h1>UTA</h1>
        <Link
            href="/"
            className={styles.card}
            rel="noopener noreferrer"
        >
        <p>
            Back
        </p>
        </Link>
        </div>
        )
};
export default Control;
