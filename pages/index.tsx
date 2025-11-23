// Copyright (c) 2025 Jeon 
// Licensed under the LunaStev License 2.0

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/home.module.css";

export default function Home() {

    const [selectedProject, setSelectedProject] = useState<{
        id: string;
        title: string;
        longDesc: string;
        tech: string[];
        link: string;
    } | null>(null);

    useEffect(() => {
        const revealElements = document.querySelectorAll(`.${styles.reveal}`);

        const handleScroll = () => {
            const triggerHeight = window.innerHeight * 0.9;

            revealElements.forEach((el) => {
                const top = el.getBoundingClientRect().top;
                if (top < triggerHeight) {
                    el.classList.add(styles.revealVisible);
                }
            });
        };

        handleScroll();       // 첫 로드시 체크
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <Head>
                <title>LunaStev</title>
                <meta
                    name="description"
                    content="LunaStev — Wave Language / Whale Toolchain Developer"
                />
            </Head>

            <main className={styles.main}>
                {/* ---------------------- NAVBAR ---------------------- */}
                <nav className={styles.navbar}>
                    <div className={styles.logo}>LunaStev</div>

                    <div className={styles.navLinks}>
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#skills">Skills</a>
                        <a href="#contact">Contact</a>
                    </div>
                </nav>

                {/* ---------------------- ABOUT SECTION ---------------------- */}
                <section id="about" className={styles.hero}>
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>
                            안녕하세요. <br />
                            LunaStev입니다.
                        </h1>

                        <h2 className={styles.subtitle}>
                            저는 <span className={styles.highlight}>시스템 언어와 OS</span>를 만들고 있어요.
                        </h2>

                        <p className={styles.description}>
                            Wave 프로그래밍 언어와 Whale 툴체인을 개발하며 <br />
                            컴파일러 · OS · 저수준 기술을 연구하고 있어요. <br />
                            작은 아이디어라도 현실에서 돌아가는 시스템을 만들 수 있다고 생각합니다.
                        </p>

                        {/* SOCIAL ICONS */}
                        <div className={styles.socials}>
                            {/* GitHub */}
                            <a
                                href="https://github.com/LunaStev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.92.57.1.78-.25.78-.55v-2.1c-3.2.69-3.87-1.54-3.87-1.54-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52C8.84 16.4 6.16 15.41 6.16 11c0-1.26.45-2.3 1.18-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.57.23 2.73.12 3.02.73.81 1.17 1.85 1.17 3.11 0 4.43-2.68 5.41-5.24 5.69.41.35.78 1.03.78 2.08v3.08c0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                                </svg>
                            </a>

                            {/* Discord */}
                            <a
                                href="https://discord.gg/3nev5nHqq9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a19.7363 19.7363 0 0 0-4.8852 1.515C2.8615 9.0458 2.139 13.5799 2.4985 18.057c1.662 1.2667 3.648 2.1858 5.9931 3.0419.4616-.6304.8731-1.2952 1.226-1.9942-1.8725-.8785-2.873-2.0743-2.873-2.0743.1258-.0943.2517-.1923.3718-.2914a12.8676 12.8676 0 0 0 12.0614 0c.1202.0991.2461.1981.372.2924 0 0-1.01 1.1958-2.8835 2.0743.3604.698.7719 1.3628 1.225 1.9932A19.9417 19.9417 0 0 0 23.5 12c0-5.73-5.23-11.5-11.5-11.5Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        <Image
                            src="/profile.png"
                            alt="Profile"
                            width={260}
                            height={260}
                            className={styles.profile}
                        />
                    </div>
                </section>

                {/* ---------------------- PROJECTS SECTION ---------------------- */}
                <section id="projects" className={styles.projects}>
                    <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Projects</h2>

                    <div className={styles.projectGrid}>
                        <ProjectCard
                            title="Wave Programming Language"
                            desc="시스템 프로그래밍 언어."
                            onClick={() =>
                                setSelectedProject({
                                    id: "wave",
                                    title: "Wave Programming Language",
                                    longDesc: `Wave는 저수준 시스템 프로그래밍을 위해 설계된 언어이며,
안전성과 성능을 모두 갖춘 현대적인 컴파일 언어입니다.`,
                                    tech: ["Rust", "Compiler", "LLVM", "IR", "Parser"],
                                    link: "https://github.com/wavefnd/Wave"
                                })
                            }
                        />

                        <ProjectCard
                            title="Whale Toolchain"
                            desc="Wave의 공식 컴파일러 툴체인 및 어셈블러."
                            onClick={() =>
                                setSelectedProject({
                                    id: "whale",
                                    title: "Whale Toolchain",
                                    longDesc:
                                        "Wave 언어를 위한 공식 컴파일러 툴체인입니다. AST → IR → 코드생성 과정을 담당합니다.",
                                    tech: ["Rust", "Assembler", "IR Builder", "Linker"],
                                    link: "https://github.com/wavefnd/Whale"
                                })
                            }
                        />

                        <ProjectCard
                            title="Vex Package Manager"
                            desc="Wave 패키지 매니저."
                            onClick={() =>
                                setSelectedProject({
                                    id: "vex",
                                    title: "Vex Package Manager",
                                    longDesc:
                                        "Wave 전용 패키지 매니저로, 크로스 플랫폼 빌드 및 배포를 위해 설계되었습니다.",
                                    tech: ["Rust", "CLI", "WSON"],
                                    link: "https://github.com/LunaStev/Vex"
                                })
                            }
                        />

                        <ProjectCard
                            title="WSON Data Format"
                            desc="Wave 전용 직렬화 포맷."
                            onClick={() =>
                                setSelectedProject({
                                    id: "wson",
                                    title: "WSON",
                                    longDesc:
                                        "JSON을 대체하는 Wave 기반 직렬화 형식이며, 더 빠르고 간결합니다.",
                                    tech: ["Rust", "Parser", "Serializer"],
                                    link: "https://github.com/LunaStev/wson-rust"
                                })
                            }
                        />

                        <ProjectCard
                            title="TechPedia"
                            desc="CC0 기반 기술 백과사전."
                            onClick={() =>
                                setSelectedProject({
                                    id: "techpedia",
                                    title: "TechPedia",
                                    longDesc:
                                        "기술 정보를 누구나 자유롭게 공유할 수 있는 CC0 기반 백과사전 플랫폼입니다.",
                                    tech: ["Next.js", "i18n", "Markdown"],
                                    link: "https://techpedia.wiki"
                                })
                            }
                        />
                    </div>
                </section>

                {/* ---------------------- SKILLS ---------------------- */}
                <section id="skills" className={styles.skills}>
                    <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Skills</h2>

                    <div className={`${styles.skillGrid} ${styles.reveal}`}>
                        <SkillCard title="Rust" desc="Systems Programming · Compiler" />
                        <SkillCard title="C" desc="OS Development · Embedded" />
                        <SkillCard title="Python" desc="Automation · Tools" />
                    </div>
                </section>

                {/* ---------------------- CONTACT ---------------------- */}
                <section id="contact" className={styles.contact}>
                    <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>Contact</h2>

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
                                `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`
                            )}`;

                            window.location.href = mailto;
                        }}
                    >
                        <input name="name" placeholder="이름" required className={styles.input} />
                        <input name="email" type="email" placeholder="이메일" required className={styles.input} />
                        <textarea name="message" placeholder="메세지를 입력하세요" required className={styles.textarea} />

                        <button type="submit" className={styles.sendButton}>
                            Send Email
                        </button>
                    </form>
                </section>

                {/* ---------------------- MODAL ---------------------- */}
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            </main>
        </>
    );
}

/* ---------------------- SMALL COMPONENTS ---------------------- */

function ProjectCard({ title, desc, onClick }) {
    return (
        <div className={styles.projectCard} onClick={onClick}>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}

function SkillCard({ title, desc }) {
    return (
        <div className={styles.skillCard}>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}

/* ---------------------- MODAL COMPONENT ---------------------- */

function ProjectModal({ project, onClose }) {
    const [slideIndex, setSlideIndex] = useState(0);

    if (!project) return null;

    // 이미지 자동 스캔 (C 방식)
    const images = (() => {
        const arr = [];
        for (let i = 1; i <= 6; i++) {
            arr.push(`/project/${project.id}/${i}.png`);
        }
        return arr;
    })();

    const nextSlide = () => setSlideIndex((slideIndex + 1) % images.length);
    const prevSlide = () =>
        setSlideIndex((slideIndex - 1 + images.length) % images.length);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✕
                </button>

                {/* SLIDER */}
                <div className={styles.slider}>
                    <img src={images[slideIndex]} className={styles.modalImage} />

                    <button className={styles.prevBtn} onClick={prevSlide}>
                        ‹
                    </button>
                    <button className={styles.nextBtn} onClick={nextSlide}>
                        ›
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
                </div>

                <h2 className={styles.modalTitle}>{project.title}</h2>

                <p className={styles.modalDesc}>{project.longDesc}</p>

                <div className={styles.modalTags}>
                    {project.tech.map((t, i) => (
                        <span key={i} className={styles.tag}>
                            {t}
                        </span>
                    ))}
                </div>

                <a href={project.link} target="_blank" className={styles.modalButton}>
                    GitHub →
                </a>
            </div>
        </div>
    );
}