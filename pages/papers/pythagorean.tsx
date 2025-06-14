// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 2.0

import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

const PDFViewer = dynamic(() => import('../../components/PDFViewer'), { ssr: false });

export default function PythagoreanPaper() {
    const { t } = useTranslation('common');

    return (
        <div>
            <Head>
                <title>{t('pythagoreanPaperTitle')}</title>
            </Head>
            <main>
                <h1>{t('pythagoreanPaperTitle')}</h1>
                <p>{t('paperPythagoreanDesc')}</p>
                <PDFViewer fileUrl="/files/pythagoras.pdf" />
            </main>
        </div>
    );
}