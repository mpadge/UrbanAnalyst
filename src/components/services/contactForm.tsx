"use client"

import React, { useState, FormEvent } from 'react';
import styles from '@/styles/services.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm(): React.JSX.Element {
    const [status, setStatus] = useState<Status>('idle');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');

        const f = e.currentTarget.elements;
        const data = {
            name:         (f.namedItem('name')         as HTMLInputElement).value,
            organisation: (f.namedItem('organisation') as HTMLInputElement).value,
            city:         (f.namedItem('city')         as HTMLInputElement).value,
            serviceType:  (f.namedItem('serviceType')  as HTMLSelectElement).value,
            siteType:     (f.namedItem('siteType')     as HTMLSelectElement).value,
            requirements: (f.namedItem('requirements') as HTMLTextAreaElement).value,
            email:        (f.namedItem('email')        as HTMLInputElement).value,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setStatus(res.ok ? 'success' : 'error');
        } catch {
            setStatus('error');
        }
    }

    if (status === 'success') {
        return (
            <div className={styles.successMessage}>
                <p>Thanks — we&apos;ll be in touch shortly.</p>
            </div>
        );
    }

    return (
        <form id="contact" className={styles.form} onSubmit={handleSubmit} noValidate>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name *</label>
                    <input
                        className={styles.input}
                        id="name" name="name" type="text"
                        required autoComplete="name"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="organisation">Organisation</label>
                    <input
                        className={styles.input}
                        id="organisation" name="organisation" type="text"
                        autoComplete="organization"
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="city">City of interest</label>
                    <input
                        className={styles.input}
                        id="city" name="city" type="text"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email *</label>
                    <input
                        className={styles.input}
                        id="email" name="email" type="email"
                        required autoComplete="email"
                    />
                </div>
            </div>

            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="serviceType">Service type</label>
                    <select className={styles.select} id="serviceType" name="serviceType" defaultValue="">
                        <option value="" disabled>Select…</option>
                        <option value="City Platform">City Platform</option>
                        <option value="Bespoke Analytics">Bespoke Analytics</option>
                        <option value="Longitudinal">Longitudinal</option>
                        <option value="Not sure">Not sure</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="siteType">Site visibility</label>
                    <select className={styles.select} id="siteType" name="siteType" defaultValue="">
                        <option value="" disabled>Select…</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                        <option value="Data delivery only">Data delivery only</option>
                        <option value="Not sure">Not sure</option>
                    </select>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="requirements">Custom requirements</label>
                <textarea
                    className={styles.textarea}
                    id="requirements" name="requirements"
                    rows={4}
                    placeholder="Describe any bespoke analyses, custom data layers, or other requirements"
                />
            </div>

            {status === 'error' && (
                <p className={styles.errorMessage}>
                    Something went wrong — please try again or email&nbsp;
                    <a href="mailto:info@urbananalyst.city">info@urbananalyst.city</a>
                    &nbsp;directly.
                </p>
            )}

            <button
                className={styles.submitButton}
                type="submit"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Sending…' : 'Send enquiry'}
            </button>

        </form>
    );
}
