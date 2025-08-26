// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import { UtilityCard } from '../components/UtilityCard';

export default function Home() {
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
                <title>{t('metaTitle')}</title>
                <meta name="description" content={t('metaDescription')} />
                <meta name="keywords" content="base64, encoder, decoder, color converter, qr generator, image resizer, json formatter, online tools, utilities" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content={t('metaTitle')} />
                <meta property="og:description" content={t('metaDescription')} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t('metaTitle')} />
                <meta name="twitter:description" content={t('metaDescription')} />
                <link rel="canonical" href="https://lunastev.org" />
                
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4304352889546147" crossOrigin="anonymous"></script>
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebApplication",
                            "name": "LunaStev Tools",
                            "description": "Free online utility tools including Base64 encoder/decoder, color converter, QR code generator, image resizer, and JSON formatter.",
                            "url": "https://lunastev.org",
                            "applicationCategory": "UtilitiesApplication",
                            "operatingSystem": "Any",
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "USD"
                            },
                            "author": {
                                "@type": "Person",
                                "name": "Jeon Yeongjae"
                            }
                        })
                    }}
                />
            </Head>

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="main-content">
                <section className="hero text-center">
                    <Container>
                        <h1 className="display-4 mb-3">{t('greeting')}</h1>
                        <p className="lead mb-4">{t('intro')}</p>
                        <div className="d-flex justify-content-center gap-3 mb-4">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                href="https://buymeacoffee.com/lunastev" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="d-flex align-items-center gap-2"
                            >
                                ☕ {t('supportButton')}
                            </Button>
                            <Link href="/portfolio" passHref legacyBehavior>
                                <Button variant="outline-primary" size="lg">
                                    {t('portfolioTitle')}
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </section>

                <Container className="py-5">
                    <Row className="g-4">
                        <Col lg={6}>
                            <Link href="/tools/base64" className="text-decoration-none">
                                <UtilityCard
                                    title={t('base64Title')}
                                    description={t('base64Description')}
                                    icon="🔄"
                                >
                                    <div className="text-center py-3">
                                        <Button variant="outline-primary" size="sm">
                                            Use Tool →
                                        </Button>
                                    </div>
                                </UtilityCard>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link href="/tools/color" className="text-decoration-none">
                                <UtilityCard
                                    title={t('colorTitle')}
                                    description={t('colorDescription')}
                                    icon="🎨"
                                >
                                    <div className="text-center py-3">
                                        <Button variant="outline-primary" size="sm">
                                            Use Tool →
                                        </Button>
                                    </div>
                                </UtilityCard>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link href="/tools/qr" className="text-decoration-none">
                                <UtilityCard
                                    title={t('qrTitle')}
                                    description={t('qrDescription')}
                                    icon="📱"
                                >
                                    <div className="text-center py-3">
                                        <Button variant="outline-primary" size="sm">
                                            Use Tool →
                                        </Button>
                                    </div>
                                </UtilityCard>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link href="/tools/image" className="text-decoration-none">
                                <UtilityCard
                                    title={t('imageTitle')}
                                    description={t('imageDescription')}
                                    icon="📷"
                                >
                                    <div className="text-center py-3">
                                        <Button variant="outline-primary" size="sm">
                                            Use Tool →
                                        </Button>
                                    </div>
                                </UtilityCard>
                            </Link>
                        </Col>
                        <Col lg={12}>
                            <Link href="/tools/json" className="text-decoration-none">
                                <UtilityCard
                                    title={t('jsonTitle')}
                                    description={t('jsonDescription')}
                                    icon="📄"
                                >
                                    <div className="text-center py-3">
                                        <Button variant="outline-primary" size="sm">
                                            Use Tool →
                                        </Button>
                                    </div>
                                </UtilityCard>
                            </Link>
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

                    {/* Ad Space Placeholder */}
                    <div className="text-center my-5 p-4 border rounded bg-light">
                        <small className="text-muted">Advertisement</small>
                        <div className="ad-space" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                            <span className="text-muted">Ad Space - Ready for Integration</span>
                        </div>
                    </div>
                </Container>

                <footer className="footer text-center py-4 mt-5" style={{ backgroundColor: 'var(--bs-gray-100)' }}>
                    <Container>
                        <p className="mb-2">© 2025 Jeon Yeongjae - {t('toolsTitle')}</p>
                        <p className="mb-0">
                            <Link href="/portfolio" className="text-decoration-none me-3">{t('portfolioTitle')}</Link>
                            <Link href="/license" className="text-decoration-none me-3">License</Link>
                            <a href="https://buymeacoffee.com/lunastev" target="_blank" rel="noopener noreferrer" className="text-decoration-none">{t('supportButton')} ☕</a>
                        </p>
                    </Container>
                </footer>
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
