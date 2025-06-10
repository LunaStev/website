// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';

export default function Home() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [theme]);

    return (
        <div className={themeClass}>
            <Head>
                <title>{t('metaTitle')}</title>
                <meta name="description" content={t('metaDescription')} />
            </Head>

            <Navbar currentTheme={theme} onThemeChange={setTheme} />

            <main className="main-content">
                {/* Hero Section */}
                <section className="hero">
                    <h1>{t('greeting')}</h1>
                    <p>{t('intro')}</p>
                    <Link href="mailto:lunastev@gurmstudios.com" passHref legacyBehavior>
                        <Button variant="primary" className="contact-btn">{t('contactButton')}</Button>
                    </Link>
                </section>

                {/* Projects Section */}
                <section className="section">
                    <h2 className="section-title">{t('projectsTitle')}</h2>
                    <div className="card-grid">
                        <div className="card"><h3>Wave</h3><p>{t('projectWave')}</p></div>
                        <div className="card"><h3>Whale</h3><p>{t('projectWhale')}</p></div>
                        <div className="card"><h3>Vex</h3><p>{t('projectVex')}</p></div>
                        <div className="card"><h3>WSON</h3><p>{t('projectWSON')}</p></div>
                        <div className="card"><h3>OpenAI C</h3><p>{t('projectOpenAIC')}</p></div>
                    </div>
                </section>

                {/* Awesome Section */}
                <section className="section">
                    <h2 className="section-title">{t('awesomeTitle')}</h2>
                    <div className="card-grid">
                        <div className="card"><h3>Awesome Wave</h3><p>{t('awesomeWave')}</p></div>
                        <div className="card"><h3>Awesome OpenAI</h3><p>{t('awesomeOpenAI')}</p></div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <p>© 2025 Jeon Yeongjae</p>
                </footer>
            </main>
        </div>
    );
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}
