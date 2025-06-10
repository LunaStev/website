// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Link from 'next/link';

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
            <Container className="py-5 text-center">
                <h1>{t('greeting')}</h1>
                <p>{t('intro')}</p>

                <Link href="mailto:lunastev@gurmstudios.com" passHref legacyBehavior>
                    <Button variant="primary" className="mt-3">
                        {t('contactButton')}
                    </Button>
                </Link>

                <h2 className="section-title mt-5">{t('projectsTitle')}</h2>
                <ul className="project-list text-start mx-auto mt-4">
                    <li><strong>Wave</strong><span> — {t('projectWave')}</span></li>
                    <li><strong>Whale</strong><span> — {t('projectWhale')}</span></li>
                    <li><strong>Vex</strong><span> — {t('projectVex')}</span></li>
                    <li><strong>WSON</strong><span> — {t('projectWSON')}</span></li>
                    <li><strong>OpenAI C</strong><span> — {t('projectOpenAIC')}</span></li>
                </ul>

                <h2 className="section-title mt-5">{t('awesomeTitle')}</h2>
                <ul className="project-list text-start mx-auto mt-4">
                    <li><strong>Awesome Wave</strong><span> — {t('awesomeWave')}</span></li>
                    <li><strong>Awesome OpenAI</strong><span> — {t('awesomeOpenAI')}</span></li>
                </ul>
            </Container>
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
