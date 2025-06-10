// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Navbar from '../../components/Navbar';
import { useState, useEffect } from 'react';

export default function LicenseV2Page() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [themeClass]);

    return (
        <div className={themeClass}>
            <Head>
                <title>LunaStev License 2.0</title>
                <meta name="description" content="LunaStev License 2.0 – General Reference License for Demos and Docs" />
            </Head>

            <Navbar currentTheme={theme} onThemeChange={setTheme} />

            <main className="license-main">
                <div className="license-wrapper">
                    <h1 className="license-title">LunaStev License 2.0</h1>
                    <p className="license-description">
                        Applies to general code samples, documentation, and demos by LunaStev. Strictly reference-only.
                    </p>

                    <section className="license-content">
                        <p><strong>Copyright (c) 2025 Jeon Yeongjae (LunaStev)</strong></p>

                        <p>
                            This source code is made publicly available for reference and educational purposes only.
                        </p>

                        <p>
                            You are permitted to view and study the code.
                            However, redistribution, commercial use, or creation of derivative works—
                            in whole or in part—is strictly prohibited without explicit prior written consent.
                        </p>

                        <p>
                            This license applies to all code marked with the "LunaStev License" header,
                            including but not limited to examples, demos, and documentation-related files
                            authored by Jeon Yeongjae (LunaStev).
                        </p>

                        <p>
                            This license is proprietary and is not governed by any standard open-source license
                            (e.g., MIT, GPL, MPL). Use of this code in open-source or commercial projects is forbidden.
                        </p>

                        <p>For licensing requests or special permissions, contact: <a href="mailto:lunastev@gurmstudios.com">lunastev@gurmstudios.com</a></p>
                    </section>
                </div>
            </main>
        </div>
    );
}
