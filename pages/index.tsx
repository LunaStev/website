// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Layout from '../components/Layout';
import { ProjectCard } from '../components/ProjectCard';

export default function Home() {
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

    return (
        <div className={themeClass}>
            <Head>
                <title>{t('metaTitle')}</title>
                <meta name="description" content={t('metaDescription')} />
            </Head>

            <Layout currentTheme={theme} onThemeChange={setTheme} />

            <main className="main-content">
                <section className="hero">
                    <h1>{t('greeting')}</h1>
                    <p>{t('intro')}</p>
                    <Link href="mailto:lunastev@gurmstudios.com" passHref legacyBehavior>
                        <Button variant="primary" className="contact-btn">{t('contactButton')}</Button>
                    </Link>
                </section>

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

                <section className="section">
                    <h2 className="section-title">📄 {t('papersTitle')}</h2>
                    <div className="card-grid">
                        <div className="card">
                            <h3>직각의 존재론</h3>
                            <p>{t('paperPythagoreanDesc')}</p>
                            <Link href="/papers/pythagorean">
                                <a>Read</a>
                            </Link>
                        </div>
                    </div>
                </section>

                <footer className="footer">
                    <p>© 2025 Jeon Yeongjae</p>
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
