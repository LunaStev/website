// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { Container, Navbar as BsNavbar, Nav } from 'react-bootstrap';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

interface Props {
    currentTheme: 'light' | 'dark' | 'purple';
    onThemeChange: (theme: 'light' | 'dark' | 'purple') => void;
}

export default function Navbar({ currentTheme, onThemeChange }: Props) {
    return (
        <BsNavbar expand="lg" className="custom-navbar">
            <Container className="d-flex justify-content-between align-items-center">
                <BsNavbar.Brand href="/" className="navbar-brand-text">
                    <span className="text-theme">LunaStev</span>
                </BsNavbar.Brand>
                <Nav className="d-flex align-items-center gap-3">
                    <ThemeToggle currentTheme={currentTheme} onChange={onThemeChange} />
                    <LanguageSwitcher />
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
