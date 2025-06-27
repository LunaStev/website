// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import Head from 'next/head';
import Layout from '../../components/Layout';
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

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="license-main">
                <div className="license-wrapper">
                    <h1 className="license-title">LunaStev License All rights reserved</h1>
                    <p className="license-description">
                        Applies to general code samples, documentation, and demos by LunaStev. Strictly reference-only.
                    </p>

                    <section className="license-content">
                        <p><strong>Copyright (c) 2025 Jeon Youngjae (LunaStev)</strong></p>

                        <p>
                            All rights reserved.
                        </p>

                        <p>
                            This source code and all associated files are strictly proprietary and confidential.
                            No portion of this repository may be copied, distributed, reproduced, or used in any form without prior written permission from the author.
                        </p>

                        <p>
                            This code is NOT open-source and is NOT licensed under any open-source license.
                        </p>

                        <p>Contact: <a href="mailto:lunastev@gurmstudios.com">lunastev@gurmstudios.com</a></p>
                    </section>
                </div>
            </main>
        </div>
    );
}