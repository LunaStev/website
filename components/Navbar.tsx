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
                    Yeongjae
                </BsNavbar.Brand>
                <Nav className="d-flex align-items-center gap-3">
                    <ThemeToggle currentTheme={currentTheme} onChange={onThemeChange} />
                    <LanguageSwitcher />
                </Nav>
            </Container>
        </BsNavbar>
    );
}