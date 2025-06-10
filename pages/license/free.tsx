// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

export default function LicenseFreePage() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [themeClass]);

    return (
        <div className={themeClass}>
            <Head>
                <title>LunaStev License Free</title>
                <meta name="description" content="LunaStev License Free – Limited Use License for Public Components" />
            </Head>

            <Navbar currentTheme={theme} onThemeChange={setTheme} />

            <main className="license-main">
                <div className="license-wrapper">
                    <h1 className="license-title">LunaStev License Free</h1>
                    <p className="license-description">
                        A special license that allows limited use of selected public code for personal and commercial projects.
                    </p>

                    <section className="license-content">
                        <p><strong>Copyright (c) 2025 Jeon Yeongjae (LunaStev)</strong></p>

                        <p>
                            This license applies to selected source code or assets made publicly available by Jeon Yeongjae (LunaStev),
                            such as small components, templates, utilities, and demos marked explicitly as &quot;Free&quot;.
                        </p>

                        <p><u>Under this license, you are permitted to:</u></p>
                        <ul>
                            <li>Use the code for personal and commercial projects</li>
                            <li>Modify and redistribute it with proper attribution</li>
                        </ul>

                        <p><u>However, you are NOT permitted to:</u></p>
                        <ul>
                            <li>Sell the code itself as a product or library</li>
                            <li>Remove or hide author attribution</li>
                            <li>Use it in illegal, malicious, or deceptive projects</li>
                        </ul>

                        <p>
                            This is a proprietary license, not governed by open-source licenses such as MIT, GPL, or MPL.
                            Attribution must include: <strong>&quot;Created by Jeon Yeongjae (LunaStev)&quot;</strong>
                        </p>

                        <p>For questions or permissions beyond this license, contact: <a href="mailto:lunastev@gurmstudios.com">lunastev@gurmstudios.com</a></p>
                    </section>
                </div>
            </main>
        </div>
    );
}