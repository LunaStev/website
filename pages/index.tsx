// Copyright (c) 2025 Jeon 
// Licensed under the LunaStev License 2.0
// Personal Website

import Head from "next/head";
import styles from "../styles/home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>LunaStev</title>
                <meta name="description" content="LunaStev's personal website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className={styles.container}>
                {/* ---------------------- HEADER ---------------------- */}
                <header className={styles.header}>
                    <h1 className={styles.name}>LunaStev</h1>
                    <p className={styles.tagline}>
                        Systems programmer and language designer.
                        Building tools for the next generation of software development.
                    </p>

                    <div className={styles.links}>
                        <a
                            href="https://github.com/LunaStev"
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:luna@lunastev.org"
                            className={styles.link}
                        >
                            Email
                        </a>
                        <a
                            href="https://discord.gg/3nev5nHqq9"
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Discord
                        </a>
                    </div>
                </header>

                {/* ---------------------- ABOUT ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>About</h2>

                    <p className={styles.paragraph}>
                        I&apos;m a systems programmer focused on building programming languages
                        and compiler toolchains. My work centers around creating safe,
                        performant tools for low-level software development.
                    </p>

                    <p className={styles.paragraph}>
                        Currently developing Wave, a modern systems programming language,
                        and its accompanying toolchain. I believe in the power of open source
                        and the importance of sharing knowledge with the community.
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* ---------------------- PROJECTS ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Projects</h2>

                    <ul className={styles.projectsList}>
                        <li className={styles.projectItem}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href="https://github.com/wavefnd/Wave"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Wave Programming Language
                                </a>
                            </h3>
                            <p className={styles.projectDesc}>
                                A modern systems programming language designed for safety and performance.
                                Wave combines strong type guarantees with zero-cost abstractions,
                                enabling developers to write fast, reliable systems software.
                            </p>
                            <p className={styles.projectMeta}>Rust, Compiler Design</p>
                        </li>

                        <li className={styles.projectItem}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href="https://github.com/wavefnd/Whale"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Whale Toolchain
                                </a>
                            </h3>
                            <p className={styles.projectDesc}>
                                Complete compiler infrastructure for Wave. Includes parser,
                                intermediate representation builder, code generator, and linker.
                                Supports cross-platform compilation with advanced optimization passes.
                            </p>
                            <p className={styles.projectMeta}>Rust, IR Generation, Optimization, Assembler</p>
                        </li>

                        <li className={styles.projectItem}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href="https://github.com/LunaStev/Vex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Vex Package Manager
                                </a>
                            </h3>
                            <p className={styles.projectDesc}>
                                Modern package manager for the Wave ecosystem. Features fast dependency
                                resolution, reproducible builds, and seamless cross-platform support.
                                Built with developer experience in mind.
                            </p>
                            <p className={styles.projectMeta}>Rust, CLI, Package Management</p>
                        </li>

                        <li className={styles.projectItem}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href="https://github.com/LunaStev/wson-rust"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WSON
                                </a>
                            </h3>
                            <p className={styles.projectDesc}>
                                Efficient data serialization format designed for Wave.
                                Combines the simplicity of JSON with type safety and performance.
                                Supports both human-readable text and binary formats.
                            </p>
                            <p className={styles.projectMeta}>Rust</p>
                        </li>

                        <li className={styles.projectItem}>
                            <h3 className={styles.projectTitle}>
                                <a
                                    href="https://techpedia.wiki"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    TechPedia
                                </a>
                            </h3>
                            <p className={styles.projectDesc}>
                                Open knowledge platform for technical documentation.
                                Built with CC0 license to ensure knowledge remains freely accessible.
                                Features multilingual support and modern editing interface.
                            </p>
                            <p className={styles.projectMeta}>MediaWiki</p>
                        </li>
                    </ul>
                </section>

                <hr className={styles.divider} />

                {/* ---------------------- OPERATING SYSTEM ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Development Environment</h2>

                    <p className={styles.paragraph}>
                        I am currently using a desktop PC purchased in 2019. It runs on a Ryzen 5 2600X CPU, an RTX 2060 GPU, and 32GB of memory. The operating system is Fedora, which I use as my primary environment for both daily tasks and development work.
                    </p>

                    <p className={styles.paragraph}>
                        Since most of my projects are closely tied to Linux and Unix-based systems, Fedora provides a more native and efficient workflow compared to Windows or WSL. I already build and compile everything directly on Linux, and Fedora’s development setup is similar to Ubuntu, making it easy to configure the tools I need without any major issues.
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* ---------------------- TECH ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Technologies</h2>

                    <p className={styles.paragraph}>
                        I work across the full stack of systems programming, from hardware
                        interfaces to high-level language design.
                    </p>

                    <div className={styles.techList}>
                        <span className={styles.techItem}>Wave</span>
                        <span className={styles.techItem}>Rust</span>
                        <span className={styles.techItem}>C/C++</span>
                        <span className={styles.techItem}>Python</span>
                        <span className={styles.techItem}>LLVM</span>
                        <span className={styles.techItem}>Compiler Design</span>
                        <span className={styles.techItem}>Operating Systems</span>
                        <span className={styles.techItem}>Assembly AMD64</span>
                    </div>
                </section>

                <hr className={styles.divider} />

                {/* ---------------------- PHILOSOPHY ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Philosophy</h2>

                    <div className={styles.quote}>
                        &quot;Talk is cheap. Show me the code.&quot;
                        <div className={styles.quoteAuthor}>— Linus Torvalds</div>
                    </div>

                    <p className={styles.paragraph}>
                        I agree deeply with this perspective—real impact comes from writing code that actually runs. But at the same time, I believe that software doesn’t need to be strictly practical to be meaningful. Even experimental or non-practical projects carry value, because they can inspire future ideas, teach important lessons, or evolve into something useful in ways we don’t expect.
                    </p>

                    <p className={styles.paragraph}>
                        Whether a project becomes widely used or eventually fades, the act of creating it still matters. Building something—anything—has intrinsic worth. That mindset drives my approach to development.
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* ---------------------- CONTACT ---------------------- */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact</h2>

                    <div className={styles.contactInfo}>
                        <p>
                            Email:{" "}
                            <a href="mailto:lunastev@gurmstudios.com">
                                lunastev@gurmstudios.com
                            </a>
                        </p>
                        <p>
                            GitHub:{" "}
                            <a
                                href="https://github.com/LunaStev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @LunaStev
                            </a>
                        </p>
                        <p>
                            Discord:{" "}
                            <a
                                href="https://discord.gg/3nev5nHqq9"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LunaStev Community
                            </a>
                        </p>
                    </div>
                </section>

                {/* ---------------------- FOOTER ---------------------- */}
                <footer className={styles.footer}>
                    <p>
                        © 2025 LunaStev · Licensed under{" "}
                        <a
                            href="https://github.com/LunaStev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LunaStev License 2.0
                        </a>
                    </p>
                </footer>
            </div>
        </>
    );
}
