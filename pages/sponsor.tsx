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
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            {network: 'Bitcoin Mainnet', address: '1GTWVr48mzBGADqY6f2QFdSbaTKLp5booH'}
                        ].map((entry, i) => (
                            <div key={i} style={{marginBottom: '1.2rem'}}>
                                <p style={{marginBottom: '0.3rem', fontWeight: 600}}>Network: {entry.network}</p>
                                <p style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem',
                                    wordBreak: 'break-all',
                                    margin: 0
                                }}>
                                    {entry.address}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2>Ethereum</h2>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            {network: 'Ethereum', address: '0xfb567459e79192376221d12420311c7fc27b3f3b'},
                            {network: 'Arbitrum One', address: '0xfb567459e79192376221d12420311c7fc27b3f3b'},
                            {network: 'Optimism', address: '0xfb567459e79192376221d12420311c7fc27b3f3b'},
                        ].map((entry, i) => (
                            <div key={i} style={{marginBottom: '1.2rem'}}>
                                <p style={{marginBottom: '0.3rem', fontWeight: 600}}>Network: {entry.network}</p>
                                <p style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem',
                                    wordBreak: 'break-all',
                                    margin: 0
                                }}>
                                    {entry.address}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2>Solana</h2>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            {network: 'Solana', address: 'HX4eJR5p2dbLMGPnWc1dQRCQpr3WYbWhthrWMXnp1rTC'},
                        ].map((entry, i) => (
                            <div key={i} style={{marginBottom: '1.2rem'}}>
                                <p style={{marginBottom: '0.3rem', fontWeight: 600}}>Network: {entry.network}</p>
                                <p style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem',
                                    wordBreak: 'break-all',
                                    margin: 0
                                }}>
                                    {entry.address}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2>BNB</h2>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            {network: 'BNB Smart Chain', address: '0xf7d5597140a4669d1cb29b9feb8bd53a20986eeb'},
                        ].map((entry, i) => (
                            <div key={i} style={{marginBottom: '1.2rem'}}>
                                <p style={{marginBottom: '0.3rem', fontWeight: 600}}>Network: {entry.network}</p>
                                <p style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem',
                                    wordBreak: 'break-all',
                                    margin: 0
                                }}>
                                    {entry.address}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h2>USDT</h2>
                    <div style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '2rem'
                    }}>
                        {[
                            {network: 'Tron', address: 'TTNuzu7cZvYweJXWShECWAEF4swHiZFsuw'},
                        ].map((entry, i) => (
                            <div key={i} style={{marginBottom: '1.2rem'}}>
                                <p style={{marginBottom: '0.3rem', fontWeight: 600}}>Network: {entry.network}</p>
                                <p style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '1.1rem',
                                    wordBreak: 'break-all',
                                    margin: 0
                                }}>
                                    {entry.address}
                                </p>
                            </div>
                        ))}
                    </div>

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
