// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { ProjectCard } from '../../components/ProjectCard';

export default function Portfolio() {
    const { t } = useTranslation('common');
    const [theme, setTheme] = useState<'light' | 'dark' | 'purple'>('light');
    const themeClass = `theme-${theme}`;

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(themeClass);
    }, [themeClass]);

    const projects = [
        {
            name: 'Wave',
            descriptionKey: 'projectWave',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/Wave' },
                { label: 'Site', url: 'https://wave-lang.dev' }
            ]
        },
        {
            name: 'Whale',
            descriptionKey: 'projectWhale',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/Whale' }
            ]
        },
        {
            name: 'Vex',
            descriptionKey: 'projectVex',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/Vex' }
            ]
        },
        {
            name: 'WSON',
            descriptionKey: 'projectWSON',
            links: [
                { label: 'Docs', url: 'https://wave-lang.dev/docs/wson' }
            ]
        },
        {
            name: 'OpenAI C',
            descriptionKey: 'projectOpenAIC',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/OpenAI-C' }
            ]
        },
        {
            name: 'PulseGPU',
            descriptionKey: '',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/pulsegpu' }
            ]
        }
    ];

    const awesome = [
        {
            name: 'Awesome Wave',
            descriptionKey: 'awesomeWave',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/awesome-wave' },
            ]
        },
        {
            name: 'Awesome OpenAI',
            descriptionKey: 'awesomeOpenAI',
            links: [
                { label: 'GitHub', url: 'https://github.com/LunaStev/awesome-openai' }
            ]
        },

    ];

    const papers = [
        {
            name: '직각의 존재론',
            descriptionKey: 'paperPythagoreanDesc',
            links: [
                { label: 'PDF', url: '/files/pythagoras.pdf' },
            ]
        }
    ];

    return (
        <div className={themeClass}>
            <Head>
                <title>{t('portfolioTitle')} - {t('metaTitle')}</title>
                <meta name="description" content={t('portfolioDescription')} />
                <meta property="og:title" content={`${t('portfolioTitle')} - ${t('metaTitle')}`} />
                <meta property="og:description" content={t('portfolioDescription')} />
            </Head>

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="main-content">
                <Container>
                    <section className="hero text-center">
                        <h1 className="display-4 mb-3">{t('portfolioTitle')}</h1>
                        <p className="lead mb-4">{t('portfolioIntro')}</p>
                        <Link href="mailto:lunastev@gurmstudios.com" passHref legacyBehavior>
                            <Button variant="primary" size="lg" className="contact-btn">
                                {t('contactButton')}
                            </Button>
                        </Link>
                    </section>

                    <Row className="my-5">
                        <Col lg={12}>
                            <section className="section">
                                <h2 className="section-title">{t('projectsTitle')}</h2>
                                <div className="card-grid">
                                    {projects.map((project, idx) => (
                                        <ProjectCard
                                            key={idx}
                                            name={project.name}
                                            description={t(project.descriptionKey)}
                                            links={project.links}
                                        />
                                    ))}
                                </div>
                            </section>
                        </Col>
                    </Row>

                    <Row className="my-5">
                        <Col lg={12}>
                            <section className="section">
                                <h2 className="section-title">{t('awesomeTitle')}</h2>
                                <div className="card-grid">
                                    {awesome.map((project, idx) => (
                                        <ProjectCard
                                            key={idx}
                                            name={project.name}
                                            description={t(project.descriptionKey)}
                                            links={project.links}
                                        />
                                    ))}
                                </div>
                            </section>
                        </Col>
                    </Row>

                    <Row className="my-5">
                        <Col lg={12}>
                            <section className="section">
                                <h2 className="section-title">📄 {t('papersTitle')}</h2>
                                <div className="card-grid">
                                    {papers.map((project, idx) => (
                                        <ProjectCard
                                            key={idx}
                                            name={project.name}
                                            description={t(project.descriptionKey)}
                                            links={project.links}
                                        />
                                    ))}
                                </div>
                            </section>
                        </Col>
                    </Row>
                </Container>

                <footer className="footer text-center py-4 mt-5">
                    <Container>
                        <p>© 2025 Jeon Yeongjae</p>
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