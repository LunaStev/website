// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 1.0

import Head from 'next/head';

export default function LicensePage() {
    return (
        <div className="theme-light license-page">
            <Head>
                <title>LunaStev License 1.0</title>
                <meta name="description" content="The official license for LunaStev's personal portfolio code." />
            </Head>

            <main className="license-container">
                <h1 className="license-title">LunaStev License 1.0</h1>
                <p className="license-subtitle">
                    This is the official license that applies to the source code of Jeon Yeongjae's personal portfolio website.
                </p>
                <pre className="license-box">
{`LunaStev License 1.0

Copyright (c) 2025 Jeon Yeongjae (LunaStev)

This source code is part of the personal portfolio website of Jeon Yeongjae.
It is made publicly available strictly for reference and educational purposes.

Permission is granted to view and study the code.
However, redistribution, commercial use, or the creation of derivative works—
in whole or in part—is not permitted without explicit prior written consent.

This code is not licensed under any standard open-source license (e.g., MIT, GPL, MPL),
and is not intended for reuse in any software product or project.

For licensing inquiries, contact: lunastev@gurmstudios.com`}
                </pre>
            </main>
        </div>
    );
}
