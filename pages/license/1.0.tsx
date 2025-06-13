// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

import Head from 'next/head';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

export default function LicenseV1Page() {
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
                <meta name="description" content="LunaStev License 1.0 – Portfolio Source Code View Only License" />
            </Head>

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="license-main">
                <div className="license-wrapper">
                    <h1 className="license-title">LunaStev License 1.0</h1>
                    <p className="license-description">
                        Applies to personal portfolio source code. View only, no reuse or redistribution.
                    </p>

                    <section className="license-content">
                        <p><strong>Copyright (c) 2025 Jeon Yeongjae (LunaStev)</strong></p>

                        <p>
                            This source code is part of the personal portfolio website of Jeon Yeongjae.
                            It is published for reference purposes only.
                        </p>

                        <p>
                            Permission is granted to view and study the code.
                            However, redistribution, commercial use, or creation of derivative works
                            based on this code (in whole or in part) is not permitted without explicit written consent.
                        </p>

                        <p>
                            This code is not licensed under any standard open source license (e.g., MIT, MPL, GPL).
                        </p>

                        <p>For inquiries, contact: <a href="mailto:lunastev@gurmstudios.com">lunastev@gurmstudios.com</a></p>
                    </section>
                </div>
            </main>
        </div>
    );
}