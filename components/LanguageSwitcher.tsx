// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 1.0

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';

const languages = ['en', 'ko', 'es'];

const languageLabels: Record<string, string> = {
    en: 'English',
    ko: '한국어',
    es: 'Español',
};

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const [open, setOpen] = useState(false);

    const current = locale || 'en';

    return (
        <div className="lang-dropdown" onClick={() => setOpen(!open)}>
            <div className="lang-selected">
                <Image src={`/flags/${current}.png`} alt={current} width={20} height={14} />
                <span>{languageLabels[current] || current.toUpperCase()}</span>
                <span className="dropdown-icon">▾</span>
            </div>
            {open && (
                <div className="lang-menu">
                    {languages.map((lng) => (
                        <Link
                            key={lng}
                            href={{ pathname, query }}
                            as={asPath}
                            locale={lng}
                            legacyBehavior
                        >
                            <a className={`lang-item ${current === lng ? 'active' : ''}`} onClick={() => setOpen(false)}>
                                <Image src={`/flags/${lng}.png`} alt={lng} width={20} height={14} />
                                <span>{languageLabels[lng] || lng.toUpperCase()}</span>
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}