
import {useState} from 'react';
import Link from 'next/link'
import styles from '@/styles/buttons.module.css';
import { ButtonProps } from '@/data/interfaces';

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

    const firstHref = getHref(props.buttons.first);
    const First = capitaliseFirst(props.buttons.first);
    const secondHref = getHref(props.buttons.second);
    const Second = capitaliseFirst(props.buttons.second);
    const thirdHref = props.buttons.third == null ? "/" : getHref(props.buttons.third);
    const Third = props.buttons.third == null ? "" : capitaliseFirst(props.buttons.third);

    return (
        <>
        <div id="top-right-container" className={styles.buttons}>
            <div id="first-button">
                <Link
                    href={firstHref}
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> {First} </p>
                </Link>
            </div>

            <div id="second-button">
                <Link
                    href={secondHref}
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> {Second} </p>
                </Link>
            </div>

            <div id="third-button">
                <Link
                    href={thirdHref}
                    className={styles.card}
                    rel="noopener noreferrer"
                >
                <p> {Third} </p>
                </Link>
            </div>
        </div>
        </>
        )
};
