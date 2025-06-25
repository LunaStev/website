// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import React from 'react';

const SponsorPage: React.FC = () => {
    return (
        <main className="license-main">
            <div className="license-wrapper">
                <h1 className="license-title">Sponsor</h1>
                <p className="license-description">
                    Your support helps keep this project independent and sustainable.
                </p>

                <div className="license-content">
                    <h2>Github Sponsor</h2>
                    <iframe
                        src="https://github.com/sponsors/LunaStev/button"
                        title="Sponsor LunaStev"
                        height="32"
                        width="114"
                        style={{border: 0, borderRadius: '6px'}}
                    ></iframe>

                    <h2>Bitcoin</h2>
                    <p>
            <span style={{fontFamily: "'Courier New', monospace", fontSize: '1.1rem'}}>
              1GTWVr48mzBGADqY6f2QFdSbaTKLp5booH
            </span>
                    </p>

                    <h2>Ko-fi</h2>
                    <p>
                        <a href="https://ko-fi.com/lunasev" target="_blank" rel="noopener noreferrer">
                            https://ko-fi.com/lunasev
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SponsorPage;
