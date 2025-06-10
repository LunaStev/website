// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the Portfolio License 1.0

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

const languages = ['en', 'ko', 'es'];

export default function LanguageSwitcher() {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;
    const [open, setOpen] = useState(false);

    const current = locale || 'en';

    return (
        <div className="lang-dropdown" onClick={() => setOpen(!open)}>
            <div className="lang-selected">
                <Image src={`/flags/${current}.png`} alt={current} width={20} height={14} />
                <span>{current.toUpperCase()}</span>
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
                                <span>{lng.toUpperCase()}</span>
                            </a>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}