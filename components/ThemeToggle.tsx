// Copyright (c) 2025 Jeon Yeongjae
// Licensed under the LunaStev License 1.0

interface Props {
    currentTheme: 'light' | 'dark' | 'purple';
    onChange: (theme: 'light' | 'dark' | 'purple') => void;
}

export default function ThemeToggle({ currentTheme, onChange }: Props) {
    return (
        <div className="theme-toggle d-flex gap-2">
            <button
                onClick={() => onChange('light')}
                className={`btn btn-sm ${currentTheme === 'light' ? 'btn-secondary' : 'btn-outline-secondary'}`}
            >
                🌞
            </button>
            <button
                onClick={() => onChange('dark')}
                className={`btn btn-sm ${currentTheme === 'dark' ? 'btn-dark' : 'btn-outline-dark'}`}
            >
                🌙
            </button>
            <button
                onClick={() => onChange('purple')}
                className={`btn btn-sm ${currentTheme === 'purple' ? 'btn-primary' : 'btn-outline-primary'}`}
            >
                🟣
            </button>
        </div>
    );
}
