// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import { Container, Navbar as BsNavbar, Nav } from 'react-bootstrap';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

interface Props {
    currentTheme: 'light' | 'dark' | 'purple';
    onThemeChange: (theme: 'light' | 'dark' | 'purple') => void;
}

export default function Navbar({ currentTheme, onThemeChange }: Props) {
    return (
        <BsNavbar bg="light" expand="lg" className="py-3">
            <Container className="d-flex justify-content-between align-items-center">
                <BsNavbar.Brand href="/" className="fw-bold">
                    LunaStev
                </BsNavbar.Brand>
                <Nav className="d-flex align-items-center gap-3">
                    <ThemeToggle currentTheme={currentTheme} onChange={onThemeChange} />
                    <LanguageSwitcher />
                    <div>
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
