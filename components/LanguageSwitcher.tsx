// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const languages = ['en', 'ko', 'es'];

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    return (
        <div className="language-switcher d-flex gap-2">
            {languages.map((lng) => (
                <Link
                    key={lng}
                    href={{ pathname, query }}
                    as={asPath}
                    locale={lng}
                    legacyBehavior
                >
                    <a>
                        <Image
                            src={`/flags/${lng}.png`}
                            alt={lng}
                            width={24}
                            height={16}
                            style={{ border: locale === lng ? '2px solid black' : 'none' }}
                        />
                    </a>
                </Link>
            ))}
        </div>
    );
}
