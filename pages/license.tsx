// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LicensePage() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [themeClass]);

    return (
        <div className={themeClass}>
            <Head>
                <title>LunaStev License 1.0</title>
                <meta name="description" content="The official license for LunaStev's personal portfolio code." />
            </Head>

            <Navbar currentTheme={theme} onThemeChange={setTheme} />

            <main className="license-main">
                <div className="license-wrapper">
                    <h1 className="license-title">LunaStev License</h1>
                    <p className="license-description">
                        {t('license-description')}
                    </p>

                    <section className="license-multi-section">
                        <div className="license-version-card">
                            <p className="license-version-description">
                                {t('license-1.0-description')}
                            </p>
                            <h2>LunaStev License 1.0</h2>
                            <Link href="/license/1.0" className="license-link">{t('license-link')}</Link>
                        </div>

                        <div className="license-version-card">
                            <h2>LunaStev License 2.0</h2>
                            <p className="license-version-description">
                                {t('license-2.0-description')}
                            </p>
                            <Link href="/license/2.0" className="license-link">{t('license-link')}</Link>
                        </div>

                        <div className="license-version-card">
                            <h2>LunaStev License Free</h2>
                            <p className="license-version-description">
                                {t('license-free-description')}
                            </p>
                            <Link href="/license/free" className="license-link">{t('license-link')}</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
