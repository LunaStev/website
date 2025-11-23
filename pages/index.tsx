// Copyright (c) 2025 Jeon 
// Licensed under the LunaStev License 2.0

import Head from "next/head";
import styles from "../styles/home.module.css";

export default function Home() {
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
                                aria-label="GitHub"
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
                                aria-label="Discord"
                            >
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a19.7363 19.7363 0 0 0-4.8852 1.515C2.8615 9.0458 2.139 13.5799 2.4985 18.057c1.662 1.2667 3.648 2.1858 5.9931 3.0419.4616-.6304.8731-1.2952 1.226-1.9942-1.8725-.8785-2.873-2.0743-2.873-2.0743.1258-.0943.2517-.1923.3718-.2914a12.8676 12.8676 0 0 0 12.0614 0c.1202.0991.2461.1981.372.2924 0 0-1.01 1.1958-2.8835 2.0743.3604.698.7719 1.3628 1.225 1.9932A19.9417 19.9417 0 0 0 23.5 12c0-5.73-5.23-11.5-11.5-11.5Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className={styles.heroImage}>
                        <img src="/profile.png" alt="Profile" className={styles.profile} />
                    </div>
                </section>

                {/* ---------------------- PROJECTS SECTION ---------------------- */}
                <section id="projects" className={styles.projects}>
                    <h2 className={styles.sectionTitle}>Projects</h2>

                    <div className={styles.projectGrid}>
                        <ProjectCard
                            title="Wave Programming Language"
                            desc="시스템 프로그래밍 언어."
                            href="https://github.com/wavefnd/Wave"
                        />

                        <ProjectCard
                            title="Whale Toolchain"
                            desc="Wave의 공식 컴파일러 툴체인 및 어셈블러."
                            href="https://github.com/wavefnd/Whale"
                        />

                        <ProjectCard
                            title="Vex Package Manager"
                            desc="Wave 패키지 매니저."
                            href="https://github.com/LunaStev/Vex"
                        />

                        <ProjectCard
                            title="WSON Data Format"
                            desc="Wave 전용 직렬화 포맷."
                            href="https://github.com/LunaStev/wson-rust"
                        />

                        <ProjectCard
                            title="TechPedia"
                            desc="CC0 기반 기술 백과사전."
                            href="https://techpedia.wiki"
                        />
                    </div>
                </section>

                {/* ---------------------- SKILLS SECTION ---------------------- */}
                <section id="skills" className={styles.skills}>
                    <h2 className={styles.sectionTitle}>Skills</h2>

                    <div className={styles.skillGrid}>
                        <SkillCard title="Rust" desc="Systems Programming · Compiler" />
                        <SkillCard title="C" desc="Low-Level · OS Development · Embedded" />
                        <SkillCard title="Python" desc="Automation · Data Tools" />
                    </div>
                </section>

                {/* ---------------------- CONTACT SECTION ---------------------- */}
                <section id="contact" className={styles.contact}>
                    <h2 className={styles.sectionTitle}>Contact</h2>

                    <form
                        className={styles.contactForm}
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;

                            const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                            const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                            const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

                            const mailto = `mailto:lunastev@gurmstudios.com?subject=${encodeURIComponent(
                                `[Contact] ${name} 님의 메시지`
                            )}&body=${encodeURIComponent(
                                `보낸 사람: ${name}\n이메일: ${email}\n\n메시지:\n${message}`
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
            </main>
        </>
    );
}

/* ---------------------- SMALL COMPONENTS ---------------------- */
function ProjectCard({ title, desc, href }) {
    return (
        <div className={styles.projectCard}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <a href={href} target="_blank" rel="noopener noreferrer" className={styles.projectButton}>
                GitHub →
            </a>
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
