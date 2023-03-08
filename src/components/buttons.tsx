
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';

interface ButtonProps {
    first: string,
    second: string
}

function capitaliseFirst(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function Buttons (props: ButtonProps) {

    function getHref (s: string) {
        if (s == "home") {
            return "/";
        } else {
            return "/" + s;
        }
    }

    const firstHref = getHref(props.props.first);
    const First = capitaliseFirst(props.props.first);
    const secondHref = getHref(props.props.second);
    const Second = capitaliseFirst(props.props.second);

    return (
        <>
        <div id="top-right-container" className={styles.buttons}>
            <div id="maps-button">
                <Link
                    href={firstHref}
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> {First} </p>
                </Link>
            </div>

            <div id="sstats-button">
                <Link
                    href={secondHref}
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> {Second} </p>
                </Link>
            </div>
        </div>
        </>
        )
};
