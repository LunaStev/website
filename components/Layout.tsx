// Layout.tsx
// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

// components/Layout.tsx
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Navbar as BsNavbar, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
    currentTheme: 'light' | 'dark' | 'purple';
    onThemeChange: (theme: 'light' | 'dark' | 'purple') => void;
}

export default function Layout({ currentTheme, onThemeChange }: Props) {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const current = locale || 'en';
    const languages = ['en', 'ko', 'es', 'zh_CH', 'de', 'fr', 'tr', 'pt', 'ja', 'ms'];
    const languageLabels: Record<string, string> = {
        en: 'English',
        ko: '한국어',
        es: 'Español',
        de: 'Deutsch',
        zh_CH: '中语',
        fr: 'Français',
        tr: 'Türkçe',
        pt: 'Português',
        ja: '日本語',
        ms: 'Bahasa Melayu'
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
        <BsNavbar expand="lg" className="custom-navbar px-3 py-2 shadow-sm bg-light">
            <Container className="d-flex justify-content-between align-items-center">
                <BsNavbar.Brand href="/" className="navbar-brand-text fw-bold">
                    <span className="text-theme">LunaStev</span>
                </BsNavbar.Brand>

                <Nav className="d-flex align-items-center gap-3">

                    {/* Theme Toggle */}
                    <div className="theme-toggle d-flex gap-2">
                        {[
                            { theme: 'light' as const, icon: '🌞', title: 'Light Theme' },
                            { theme: 'dark' as const, icon: '🌙', title: 'Dark Theme' },
                            { theme: 'purple' as const, icon: '🟣', title: 'Purple Theme' },
                        ].map(({ theme, icon, title }) => (
                            <OverlayTrigger key={theme} placement="bottom" overlay={<Tooltip>{title}</Tooltip>}>
                                <button
                                    onClick={() => onThemeChange(theme)}
                                    className={`btn btn-sm ${currentTheme === theme ? `btn-${theme === 'purple' ? 'primary' : theme}` : `btn-outline-${theme === 'purple' ? 'primary' : theme}`}`}
                                >
                                    {icon}
                                </button>
                            </OverlayTrigger>
                        ))}
                    </div>

                    {/* Language Switcher */}
                    <div className="lang-dropdown position-relative" ref={dropdownRef}>
                        <div className="lang-selected d-flex align-items-center gap-1" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                            <Image src={`/flags/${current}.png`} alt={current} width={20} height={14} />
                            <span className={`language-label text-${currentTheme}`}>{languageLabels[current]}</span>
                            <span className="dropdown-icon">▾</span>
                        </div>
                        {open && (
                            <div className="lang-menu position-absolute mt-2 bg-white border rounded shadow-sm p-2" style={{ zIndex: 1000 }}>
                                {languages.map((lng) => (
                                    <Link
                                        key={lng}
                                        href={{ pathname, query }}
                                        as={asPath}
                                        locale={lng}
                                        legacyBehavior
                                    >
                                        <a
                                            className={`lang-item d-flex align-items-center gap-2 px-2 py-1 ${current === lng ? 'bg-light fw-bold' : ''}`}
                                            onClick={() => setOpen(false)}
                                        >
                                            <Image src={`/flags/${lng}.png`} alt={lng} width={20} height={14} />
                                            <span className={`language-label text-${currentTheme}`}>{languageLabels[lng]}</span>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 기타 요소 */}
                    <Nav.Link href="/license" className="d-none d-md-block">
                        License
                    </Nav.Link>
                    <div className="d-none d-md-block">
                        <iframe
                            src="https://github.com/sponsors/LunaStev/button"
                            title="Sponsor LunaStev"
                            height="32"
                            width="114"
                            style={{ border: 0, borderRadius: '6px' }}
                        ></iframe>
                    </div>

                </Nav>
            </Container>
        </BsNavbar>
    );
}
