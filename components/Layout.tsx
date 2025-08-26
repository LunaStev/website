// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { useTranslation } from 'next-i18next';

interface Props {
    currentTheme: 'light' | 'dark' | 'purple';
    onThemeChange: (theme: 'light' | 'dark' | 'purple') => void;
}

export default function Layout({ currentTheme, onThemeChange }: Props) {
    const { t } = useTranslation('common');
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const current = locale || 'en';
    const languages = ['en', 'ko', 'es', 'zh_CH', 'ja'];
    const languageLabels: Record<string, string> = {
        en: 'English',
        ko: '한국어',
        es: 'Español',
        zh_CH: '中文',
        ja: '日本語',
    };

    useEffect(() => {
        const closeOnOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', closeOnOutsideClick);
        return () => document.removeEventListener('mousedown', closeOnOutsideClick);
    }, []);

    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container className="d-flex justify-content-between align-items-center">
                <Link href="/" className="navbar-brand-text">LunaStev</Link>

                <Nav className="d-flex align-items-center gap-3">

                    <NavDropdown title={t('toolsTitle')} id="tools-dropdown">
                        <NavDropdown.Item href="/tools/base64">
                            🔄 {t('base64Title')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/tools/color">
                            🎨 {t('colorTitle')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/tools/qr">
                            📱 {t('qrTitle')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/tools/image">
                            📷 {t('imageTitle')}
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/tools/json">
                            📄 {t('jsonTitle')}
                        </NavDropdown.Item>
                    </NavDropdown>

                    <Link href="/portfolio" legacyBehavior>
                        <a className="nav-link">{t('portfolioTitle')}</a>
                    </Link>

                    <Link href="/graph" legacyBehavior>
                        <a className="nav-link">Graph</a>
                    </Link>

                    {/* Theme Toggle */}
                    <div className="theme-toggle d-flex gap-1">
                        {[
                            { theme: 'light' as const, icon: '🌞', title: 'Light' },
                            { theme: 'dark' as const, icon: '🌙', title: 'Dark' },
                            { theme: 'purple' as const, icon: '🟣', title: 'Purple' },
                        ].map(({ theme, icon, title }) => (
                            <button
                                key={theme}
                                onClick={() => onThemeChange(theme)}
                                className={currentTheme === theme ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-secondary'}
                                title={title}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="lang-dropdown" ref={dropdownRef}>
                        <div className="lang-selected" onClick={() => setOpen(!open)}>
                            <Image src={`/flags/${current}.png`} alt={current} width={20} height={14} />
                            <span>{languageLabels[current]}</span>
                            <span style={{ fontSize: '0.8rem' }}>▾</span>
                        </div>
                        {open && (
                            <div className="lang-menu">
                                {languages.map((lng) => (
                                    <Link key={lng} href={{ pathname, query }} as={asPath} locale={lng} legacyBehavior>
                                        <a
                                            className={`lang-item ${current === lng ? 'active' : ''}`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <Image src={`/flags/${lng}.png`} alt={lng} width={20} height={14} />
                                            {languageLabels[lng]}
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* GitHub Sponsor Button */}
                    <div className="d-none d-md-block d-flex align-items-center gap-2">
                        <Link href="/sponsor" legacyBehavior>
                            <a className="btn btn-sm btn-outline-primary" style={{ borderRadius: '8px' }}>
                                Sponsor
                            </a>
                        </Link>
                    </div>

                    {/* License Page */}
                    <Nav.Link href="/license" className="d-none d-md-block">License</Nav.Link>

                    <SpeedInsights />
                    <Analytics />
                </Nav>
            </Container>
        </Navbar>
    );
}
