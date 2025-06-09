// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import {useEffect, useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');

    const themeClass = `theme-${theme}`;
    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(`theme-${theme}`);
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

                <Button
                    variant="primary"
                    className="mt-3"
                    as={Link}
                    href="mailto:lunastev@gurmstudios.com"
                >
                    {t('contactButton')}
                </Button>
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
