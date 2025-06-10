// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

export default function LicensePage() {
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
                        This is the official license that applies to the source code.
                    </p>

                    <section className="license-multi-section">
                        <div className="license-version-card">
                            <h2>LunaStev License 1.0</h2>
                            <p className="license-version-description">
                                Personal portfolio source code – view only. Redistribution and reuse strictly prohibited.
                            </p>
                            <Link href="/license/1.0" className="license-link">View Full Text →</Link>
                        </div>

                        <div className="license-version-card">
                            <h2>LunaStev License 2.0</h2>
                            <p className="license-version-description">
                                General-purpose reference license. Applies to demos, docs, and example code by LunaStev.
                            </p>
                            <Link href="/license/2.0" className="license-link">View Full Text →</Link>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
