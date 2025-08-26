// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { JSONFormatter } from '../../components/JSONFormatter';

export default function JSONPage() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [themeClass]);

    return (
        <div className={themeClass}>
            <Head>
                <title>{t('jsonTitle')} - {t('metaTitle')}</title>
                <meta name="description" content={t('jsonDescription')} />
                <meta property="og:title" content={`${t('jsonTitle')} - ${t('metaTitle')}`} />
                <meta property="og:description" content={t('jsonDescription')} />
                <link rel="canonical" href="https://lunastev.org/tools/json" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4304352889546147" crossOrigin="anonymous"></script>
            </Head>

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="main-content">
                <Container>
                    <div className="text-center mb-4">
                        <Link href="/" className="btn btn-outline-secondary mb-3">
                            ← {t('toolsTitle')}
                        </Link>
                        <h1 className="display-5 mb-3">📄 {t('jsonTitle')}</h1>
                        <p className="lead text-muted">{t('jsonDescription')}</p>
                    </div>

                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <Card className="utility-card">
                                <Card.Body className="p-4">
                                    <JSONFormatter />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <div className="text-center mt-5 p-4 bg-light rounded">
                        <h3>💝 {t('supportTitle')}</h3>
                        <p className="mb-3">{t('supportDescription')}</p>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            href="https://buymeacoffee.com/lunastev" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="d-flex align-items-center justify-content-center gap-2 mx-auto"
                            style={{ maxWidth: '200px' }}
                        >
                            ☕ {t('supportButton')}
                        </Button>
                    </div>
                </Container>
            </main>
        </div>
    );
}

export async function getStaticProps({locale}: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}