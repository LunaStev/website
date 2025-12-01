// Copyright (c) 2025 Jeon 
// Licensed under the LunaStev License 2.0
// Completely Redesigned Layout

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.css";

type Project = {
    id: string;
    title: string;
    longDesc: string;
    tech: string[];
    link: string;
};

export default function Home() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        const revealElements = document.querySelectorAll(`.${styles.reveal}`);

        const handleScroll = () => {
            const triggerHeight = window.innerHeight * 0.85;

            revealElements.forEach((el) => {
                const top = el.getBoundingClientRect().top;
                if (top < triggerHeight) {
                    el.classList.add(styles.revealVisible);
                }
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <Head>
                <title>LunaStev — System Programming Visionary</title>
                <meta
                    name="description"
                    content="Creating the future of system programming with Wave Language & Whale Toolchain"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.main}>
                {/* ---------------------- SIDEBAR NAVIGATION ---------------------- */}
                <nav className={styles.navbar}>
                    <div>
                        <div className={styles.logo}>LunaStev</div>

                        <div className={styles.navLinks}>
                            <a onClick={() => scrollToSection('hero')}>Home</a>
                            <a onClick={() => scrollToSection('projects')}>Projects</a>
                            <a onClick={() => scrollToSection('skills')}>Skills</a>
                            <a onClick={() => scrollToSection('contact')}>Contact</a>
                        </div>
                    </div>

                    <div className={styles.socials}>
                        <a
                            href="https://github.com/LunaStev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="GitHub"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55v-2.1c-3.2.69-3.87-1.54-3.87-1.54-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52C8.84 16.4 6.16 15.41 6.16 11c0-1.26.45-2.3 1.18-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.73.81 1.17 1.85 1.17 3.11 0 4.43-2.68 5.41-5.24 5.69.41.35.78 1.03.78 2.08v3.08c0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                            </svg>
                        </a>

                        <a
                            href="https://discord.gg/3nev5nHqq9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialIcon}
                            aria-label="Discord"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                            </svg>
                        </a>
                    </div>
                </nav>

                {/* ---------------------- CONTENT WRAPPER ---------------------- */}
                <div className={styles.contentWrapper}>

                    {/* ---------------------- HERO SECTION ---------------------- */}
                    <section id="hero" className={styles.hero}>
                        <div className={styles.heroContent}>
                            <div className={styles.titleWrapper}>
                                <h1 className={styles.title}>
                                    <span className={styles.titleLine1}>Building the</span>
                                    <span className={styles.titleLine2}>Future of Systems</span>
                                </h1>
                            </div>

                            <p className={styles.subtitle}>
                                시스템 프로그래밍 언어와 툴체인을 개발하며,<br />
                                컴파일러부터 OS까지 저수준 기술의 모든 영역을 탐구합니다.
                            </p>

                            <button
                                className={styles.ctaButton}
                                onClick={() => scrollToSection('projects')}
                            >
                                Explore My Work
                                <span>→</span>
                            </button>
                        </div>

                        <div className={styles.heroImage}>
                            <Image
                                src="/profile.png"
                                alt="LunaStev"
                                width={450}
                                height={450}
                                priority
                            />
                        </div>
                    </section>

                    {/* ---------------------- PROJECTS - BENTO GRID ---------------------- */}
                    <section id="projects" className={styles.projects}>
                        <div className={`${styles.sectionHeader} ${styles.reveal}`}>
                            <h2 className={styles.sectionTitle}>Featured Work</h2>
                            <p className={styles.sectionSubtitle}>
                                혁신적인 시스템 프로그래밍 도구들
                            </p>
                        </div>

                        <div className={`${styles.bentoGrid} ${styles.reveal}`}>
                            <BentoProjectCard
                                title="Wave Programming Language"
                                desc="차세대 시스템 프로그래밍을 위한 안전하고 강력한 컴파일 언어. 메모리 안전성과 고성능을 동시에 제공합니다."
                                onClick={() =>
                                    setSelectedProject({
                                        id: "wave",
                                        title: "Wave Programming Language",
                                        longDesc: `Wave는 시스템 프로그래밍의 미래를 위해 설계된 현대적인 언어입니다. Rust의 안전성과 C의 성능을 결합하여, 개발자가 메모리 관리를 걱정하지 않고도 최고의 성능을 달성할 수 있도록 합니다. 

강력한 타입 시스템과 제로코스트 추상화를 통해 버그를 컴파일 타임에 잡아내며, LLVM 기반의 최적화로 네이티브 수준의 성능을 보장합니다.`,
                                        tech: ["Rust", "LLVM", "Compiler Design", "Type Theory", "IR Generation"],
                                        link: "https://github.com/wavefnd/Wave"
                                    })
                                }
                            />

                            <BentoProjectCard
                                title="Whale Toolchain"
                                desc="Wave를 위한 완전한 컴파일러 인프라와 개발 도구 모음입니다."
                                onClick={() =>
                                    setSelectedProject({
                                        id: "whale",
                                        title: "Whale Toolchain",
                                        longDesc: `Whale은 Wave 언어의 공식 툴체인으로, 소스 코드 분석부터 실행 파일 생성까지 전체 컴파일 파이프라인을 담당합니다.

고급 최적화 패스, 크로스 플랫폼 지원, 그리고 빠른 컴파일 속도를 제공하며, 개발자 경험을 최우선으로 고려한 설계를 갖추고 있습니다.`,
                                        tech: ["Rust", "AST", "Code Generation", "Linker", "Optimizer"],
                                        link: "https://github.com/wavefnd/Whale"
                                    })
                                }
                            />

                            <BentoProjectCard
                                title="Vex Package Manager"
                                desc="의존성 관리와 빌드 자동화를 위한 현대적 패키지 매니저."
                                onClick={() =>
                                    setSelectedProject({
                                        id: "vex",
                                        title: "Vex Package Manager",
                                        longDesc: `Vex는 Wave 생태계를 위한 패키지 관리 솔루션입니다. 빠른 의존성 해석, 보안 검증, 그리고 재현 가능한 빌드를 제공합니다.

모던한 CLI 인터페이스와 직관적인 설정으로 프로젝트 관리를 간소화하며, 크로스 플랫폼 배포를 완벽하게 지원합니다.`,
                                        tech: ["Rust", "Package Management", "CLI", "WSON", "Semver"],
                                        link: "https://github.com/LunaStev/Vex"
                                    })
                                }
                            />

                            <BentoProjectCard
                                title="WSON Format"
                                desc="타입 안전성과 성능을 갖춘 새로운 데이터 직렬화 포맷."
                                onClick={() =>
                                    setSelectedProject({
                                        id: "wson",
                                        title: "WSON Data Format",
                                        longDesc: `WSON은 JSON의 단순함과 바이너리 포맷의 효율성을 결합한 혁신적인 직렬화 형식입니다.

타입 정보를 보존하면서도 높은 성능을 제공하며, 사람이 읽을 수 있는 텍스트 형식과 고속 바이너리 형식을 모두 지원합니다.`,
                                        tech: ["Rust", "Serialization", "Binary Protocol", "Parser Combinator"],
                                        link: "https://github.com/LunaStev/wson-rust"
                                    })
                                }
                            />

                            <BentoProjectCard
                                title="TechPedia - Open Knowledge Platform"
                                desc="CC0 라이선스 기반의 개방형 기술 백과사전. 전 세계 개발자들이 자유롭게 지식을 공유하는 플랫폼입니다."
                                onClick={() =>
                                    setSelectedProject({
                                        id: "techpedia",
                                        title: "TechPedia",
                                        longDesc: `TechPedia는 기술 지식의 민주화를 목표로 하는 오픈 플랫폼입니다. 누구나 자유롭게 기여하고 사용할 수 있도록 CC0 라이선스를 채택했습니다.

다국어 지원, MDX 기반 편집, 그리고 빠른 검색 기능을 통해 개발자들이 지식을 쉽게 찾고 공유할 수 있습니다.`,
                                        tech: ["Next.js", "TypeScript", "MDX", "i18n", "Search Engine"],
                                        link: "https://techpedia.wiki"
                                    })
                                }
                            />
                        </div>
                    </section>

                    {/* ---------------------- SKILLS ---------------------- */}
                    <section id="skills" className={styles.skills}>
                        <div className={`${styles.sectionHeader} ${styles.reveal}`}>
                            <h2 className={styles.sectionTitle}>Expertise</h2>
                            <p className={styles.sectionSubtitle}>
                                시스템부터 웹까지, 전방위적 기술 스택
                            </p>
                        </div>

                        <div className={`${styles.skillsGrid} ${styles.reveal}`}>
                            <SkillCard
                                icon="🦀"
                                title="Rust"
                                desc="시스템 프로그래밍, 컴파일러 개발, 고성능 애플리케이션"
                            />
                            <SkillCard
                                icon="⚡"
                                title="C/C++"
                                desc="OS 개발, 임베디드 시스템, 저수준 최적화"
                            />
                            <SkillCard
                                icon="🐍"
                                title="Python"
                                desc="자동화, 스크립팅, 빠른 프로토타이핑"
                            />
                            <SkillCard
                                icon="🔧"
                                title="Compiler Design"
                                desc="렉서, 파서, IR 설계, 코드 생성 및 최적화"
                            />
                            <SkillCard
                                icon="💻"
                                title="Operating Systems"
                                desc="커널 개발, 메모리 관리, 스케줄링"
                            />
                            <SkillCard
                                icon="🌐"
                                title="Web Development"
                                desc="Next.js, React, TypeScript, Modern UI/UX"
                            />
                        </div>
                    </section>

                    {/* ---------------------- CONTACT ---------------------- */}
                    <section id="contact" className={styles.contact}>
                        <div className={styles.contactContent}>
                            <div className={`${styles.contactInfo} ${styles.reveal}`}>
                                <h2>Let's Build Something Amazing</h2>
                                <p>
                                    새로운 프로젝트, 협업 기회, 또는 단순한 인사라도 환영합니다.
                                    언제든지 연락 주세요!
                                </p>

                                <div className={styles.contactDetails}>
                                    <div className={styles.contactItem}>
                                        <span>📧</span>
                                        <span>lunastev@gurmstudios.com</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <span>💼</span>
                                        <span>github.com/LunaStev</span>
                                    </div>
                                    <div className={styles.contactItem}>
                                        <span>💬</span>
                                        <span>discord.gg/3nev5nHqq9</span>
                                    </div>
                                </div>
                            </div>

                            <form
                                className={`${styles.contactForm} ${styles.reveal}`}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = e.target as HTMLFormElement;

                                    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                                    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                                    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

                                    const mailto = `mailto:lunastev@gurmstudios.com?subject=${encodeURIComponent(
                                        `[Contact] ${name}`
                                    )}&body=${encodeURIComponent(
                                        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
                                    )}`;

                                    window.location.href = mailto;
                                }}
                            >
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Your Name</label>
                                    <input
                                        name="name"
                                        placeholder="홍길동"
                                        required
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Email Address</label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        required
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="프로젝트에 대해 이야기하고 싶어요..."
                                        required
                                        className={styles.textarea}
                                    />
                                </div>

                                <button type="submit" className={styles.sendButton}>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </section>

                </div>

                {/* ---------------------- MODAL ---------------------- */}
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </main>
        </>
    );
}

/* ---------------------- BENTO PROJECT CARD ---------------------- */

function BentoProjectCard({
                              title,
                              desc,
                              onClick,
                          }: {
    title: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <article className={styles.projectCard} onClick={onClick}>
            <h3>{title}</h3>
            <p>{desc}</p>
        </article>
    );
}

/* ---------------------- SKILL CARD ---------------------- */

function SkillCard({
                       icon,
                       title,
                       desc
                   }: {
    icon: string;
    title: string;
    desc: string;
}) {
    return (
        <article className={styles.skillCard}>
            <div className={styles.skillIcon}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </article>
    );
}

/* ---------------------- PROJECT MODAL ---------------------- */

function ProjectModal({
                          project,
                          onClose,
                      }: {
    project: Project;
    onClose: () => void;
}) {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    const images = Array.from({ length: 6 }, (_, i) =>
        `/project/${project.id}/${i + 1}.png`
    );

    const nextSlide = () => setSlideIndex((slideIndex + 1) % images.length);
    const prevSlide = () => setSlideIndex((slideIndex - 1 + images.length) % images.length);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>

                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <div>
                            <h2 className={styles.modalTitle}>{project.title}</h2>
                            <p className={styles.modalDesc}>{project.longDesc}</p>

                            <div className={styles.modalTags}>
                                {project.tech.map((tech, i) => (
                                    <span key={i} className={styles.tag}>
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.modalButton}
                            >
                                View on GitHub
                                <span>→</span>
                            </a>
                        </div>

                        <div className={styles.slider}>
                            <img
                                src={images[slideIndex]}
                                className={styles.modalImage}
                                alt={`${project.title} screenshot`}
                            />

                            <div className={styles.sliderControls}>
                                <button
                                    className={styles.prevBtn}
                                    onClick={prevSlide}
                                    aria-label="Previous"
                                >
                                    ‹
                                </button>

                                <div className={styles.dots}>
                                    {images.map((_, i) => (
                                        <span
                                            key={i}
                                            className={`${styles.dot} ${
                                                i === slideIndex ? styles.dotActive : ""
                                            }`}
                                            onClick={() => setSlideIndex(i)}
                                        />
                                    ))}
                                </div>

                                <button
                                    className={styles.nextBtn}
                                    onClick={nextSlide}
                                    aria-label="Next"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}