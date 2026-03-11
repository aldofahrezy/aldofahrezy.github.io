/**
 * DataPipeline.jsx — Scroll-triggered portfolio sections
 *
 * Each section reveals with sophisticated anime.js stagger animations
 * when it enters the viewport via IntersectionObserver.
 * Clean, spacious design inspired by animejs.com aesthetics.
 */
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

/* ═══════════════════════════════════════════
   Content Data
   ═══════════════════════════════════════════ */

const STATS = [
    { value: '8+', label: 'Awards' },
    { value: '10+', label: 'Projects' },
    { value: '5+', label: 'Competitions' },
    { value: '3', label: 'Languages' },
]

const EXPERIENCES = [
    {
        role: 'Teaching Assistant',
        org: 'Faculty of Computer Science, Universitas Indonesia',
        period: 'Jan 2025 – Present',
        desc: [
            'Linear Algebra, Programming Foundations II, Statistics & Probability, Introduction to Digital Systems',
            'Hold weekly tutorial sessions and supervise examinations',
            'Create, distribute, and assess assignments and quizzes',
        ],
    },
    {
        role: 'Curator',
        org: 'TEDx Universitas Indonesia',
        period: 'Dec 2024 – Feb 2025',
        desc: [
            'Conducted market research to discover potential speakers',
            'Curated and developed talk scripts and presentations',
            'Collaborated weekly to revise scripts and develop talks',
        ],
    },
]

const ACHIEVEMENTS = [
    { title: '2nd Winner – PKM-PI OIM UI', org: 'BEM UI', year: '2025', level: 'University' },
    { title: '3rd Winner – Pekan Ristek DS Competition', org: 'RISTEK Fasilkom UI', year: '2025', level: 'University' },
    { title: 'Finalist – GarudaHacks 6.0 Hackathon', org: 'GarudaHQ', year: '2025', level: 'International' },
    { title: '1st Winner – RISE! IT Business Case Competition', org: 'ITS', year: '2024', level: 'National' },
    { title: 'Silver Medal – Youth International Science Fair', org: 'IYSA', year: '2024', level: 'International' },
    { title: 'Gold Medal – Indonesia International Applied Science Project Olympiad', org: 'IYSA', year: '2023', level: 'International' },
    { title: '3rd Winner & Favourite Champion – UI Innovation War', org: 'BEM UI', year: '2023', level: 'National' },
    { title: '2nd Winner – Digix UNPAD Business Plan Competition', org: 'Himagi UNPAD', year: '2023', level: 'National' },
]

const PROJECTS = [
    { title: 'AWMI Medical Tourism Ecosystem', description: 'A comprehensive digital ecosystem for the Indonesian Medical Tourism Association — Patient Frontend, Admin Backend, and Hospital Portal with NLP-based AI Chatbot for symptom triage.', tags: ['NLP', 'AI Chatbot', 'Full-Stack', 'PKM-PI'] },
    { title: 'Seismic S-Wave Arrival Prediction', description: 'Predictive regression model to estimate Secondary Wave arrival times using the STEAD dataset, engineered for earthquake early warning systems.', tags: ['Regression', 'Seismology', 'RMSE Optimization'] },
    { title: 'GarisNadi – Batik Pattern Database', description: 'Online open database of Batik patterns in Indonesia with AI-powered pattern recognition and generation.', tags: ['TensorFlow', 'Django', 'Computer Vision'] },
    { title: 'GarudaHacks 6.0 – AI Image Classifier', description: 'Hackathon finalist project: website with OpenAI/Gemini API integration and a custom TensorFlow model.', tags: ['Next.js', 'TensorFlow', 'Hackathon'] },
    { title: 'Tiket Bisa', description: 'A startup offering online ticket-selling services for Indonesian football event organizers.', tags: ['Startup', 'E-Commerce'] },
    { title: 'Jitu Academy – UTBK Online Tryout', description: 'An online tryout platform and engine for the UTBK tutoring startup.', tags: ['EdTech', 'Platform'] },
    { title: 'BEM Chatting Platform', description: 'A real-time chatting platform with websockets for BEM members.', tags: ['React', 'WebSocket', 'MongoDB'] },
    { title: 'LigaPass – PWA Ticket Sales', description: 'Progressive Web App providing ticket sales services for the Indonesian Super League.', tags: ['PWA', 'Django', 'Flutter'] },
    { title: 'PT INALUM Smart Factory Solution', description: '1st place IT business case solution implementing ERP, SCM, MES, SCADA, PLC with IoT and AI.', tags: ['IoT', 'ERP', 'Data Science'] },
    { title: 'Salasa Daya Utamaindo', description: 'A company profile and product catalogue website for a local company in Batam.', tags: ['Web Dev', 'Company Profile'] },
]

const SKILL_BARS = [
    { name: 'Python', level: 92 },
    { name: 'Machine Learning', level: 88 },
    { name: 'Deep Learning', level: 80 },
    { name: 'Data Analysis & Visualization', level: 90 },
    { name: 'Natural Language Processing', level: 78 },
    { name: 'Computer Vision', level: 75 },
]

const TOOLS = [
    'Scikit-learn', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'XGBoost',
    'MediaPipe', 'Hugging Face', 'SQL', 'Git', 'Docker', 'Jupyter',
    'Django', 'Next.js', 'React', 'TypeScript', 'Flutter', 'MongoDB',
]

const OTHER_SKILLS = [
    'Java', 'Excel', 'Figma', 'Canva', 'Premiere Pro', 'After Effects',
    'Photoshop', 'Illustrator', 'Lightroom', 'Public Speaking',
]

const SOCIAL_LINKS = [
    { name: 'GitHub', href: 'https://github.com/aldofahrezy', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/aldofahrezy', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: 'WhatsApp', href: 'https://wa.me/6282268700050', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
    { name: 'Instagram', href: 'https://instagram.com/aldofhrzy', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
]

const LEVEL_COLORS = { International: '#0891b2', National: '#7c3aed', University: '#4f46e5' }

/* ═══════════════════════════════════════════
   Scroll Reveal Hook
   ═══════════════════════════════════════════ */

function useScrollReveal(threshold = 0.1) {
    const ref = useRef(null)
    const [revealed, setRevealed] = useState(false)
    const fired = useRef(false)

    useEffect(() => {
        if (!ref.current || fired.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !fired.current) {
                    fired.current = true
                    setRevealed(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )
        observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])

    return [ref, revealed]
}

/* ═══════════════════════════════════════════
   Section Header
   ═══════════════════════════════════════════ */

function SectionHeader({ num, label, color }) {
    return (
        <div className="s-header" style={{ opacity: 0, marginBottom: 48 }}>
            <p className="section-label mb-4" style={{ color }}>{num} — {label.toUpperCase()}</p>
            <h2 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text">{label}</span>
            </h2>
        </div>
    )
}

/* ═══════════════════════════════════════════
   Section Divider
   ═══════════════════════════════════════════ */

function SectionDivider() {
    return (
        <div className="flex justify-center">
            <div style={{
                width: 1,
                height: 80,
                background: 'linear-gradient(180deg, transparent, var(--glass-border), transparent)',
            }} />
        </div>
    )
}

/* ═══════════════════════════════════════════
   Stagger Grid Decoration (per section)
   ═══════════════════════════════════════════ */

function StaggerDecor({ color, revealed, position = 'right' }) {
    const gridRef = useRef(null)

    useEffect(() => {
        if (!revealed || !gridRef.current) return
        const dots = gridRef.current.querySelectorAll('.decor-dot')

        anime({
            targets: dots,
            opacity: [0, 0.3],
            scale: [0, 1],
            delay: anime.stagger(30, { grid: [6, 6], from: 'center' }),
            duration: 600,
            easing: 'easeOutExpo',
        })

        // Subtle pulse loop
        anime({
            targets: dots,
            opacity: [
                { value: 0.5, duration: 1200, easing: 'easeInOutSine' },
                { value: 0.2, duration: 1200, easing: 'easeInOutSine' },
            ],
            delay: anime.stagger(80, { grid: [6, 6], from: 'center' }),
            loop: true,
        })
    }, [revealed])

    return (
        <div
            ref={gridRef}
            className="absolute pointer-events-none hidden lg:block"
            style={{
                [position]: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 3px)',
                gap: 16,
                opacity: 0.4,
            }}
        >
            {Array.from({ length: 36 }).map((_, i) => (
                <div
                    key={i}
                    className="decor-dot"
                    style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: color,
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    )
}

/* ═══════════════════════════════════════════
   About Section
   ═══════════════════════════════════════════ */

function AboutSection() {
    const [ref, revealed] = useScrollReveal(0.15)

    useEffect(() => {
        if (!revealed) return

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#about .s-header',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
            })
            .add({
                targets: '#about .s-text',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
                delay: anime.stagger(80),
            }, 200)
            .add({
                targets: '#about .s-card',
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                duration: 600,
                delay: anime.stagger(60),
            }, 500)

        // Animate stat number count-up
        document.querySelectorAll('#about .stat-value').forEach((el) => {
            const text = el.textContent
            const num = parseInt(text)
            if (!isNaN(num)) {
                const suffix = text.replace(String(num), '')
                const counter = { val: 0 }
                anime({
                    targets: counter,
                    val: num,
                    round: 1,
                    duration: 1500,
                    easing: 'easeOutExpo',
                    delay: 700,
                    update: () => {
                        el.textContent = counter.val + suffix
                    },
                })
            }
        })
    }, [revealed])

    return (
        <section ref={ref} id="about" className="portfolio-section relative">
            <StaggerDecor color="var(--node-1)" revealed={revealed} position="right" />
            <div className="container">
                <SectionHeader num="01" label="About" color="var(--node-1)" />

                <div style={{ maxWidth: 680 }}>
                    <p className="s-text text-[var(--text-secondary)] leading-relaxed mb-5" style={{ opacity: 0 }}>
                        I&apos;m <span className="text-[var(--text-primary)] font-semibold">Muhammad Aldo Fahrezy</span>,
                        a Computer Science student at <span className="text-[var(--text-primary)] font-semibold">Universitas Indonesia</span>,
                        passionate about AI/ML Engineering and Data Science. I build solutions that transform complex
                        data into actionable intelligence — from NLP-powered chatbots to real-time drowsiness detection systems.
                    </p>
                    <p className="s-text text-[var(--text-secondary)] leading-relaxed mb-5" style={{ opacity: 0 }}>
                        Beyond academics, I&apos;ve served as a <span className="text-[var(--text-primary)] font-semibold">Teaching Assistant</span> for
                        Linear Algebra, Statistics &amp; Probability, and Programming Foundations. I also curated a TEDx talk at Universitas Indonesia.
                    </p>
                    <p className="s-text text-[var(--text-secondary)] leading-relaxed mb-10" style={{ opacity: 0 }}>
                        Fluent in Bahasa Indonesia, English, and working proficiency in French.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="s-card glass-card p-6 text-center" style={{ opacity: 0 }}>
                            <span className="stat-value text-2xl font-extrabold block mb-1" style={{ color: 'var(--node-1)' }}>
                                {s.value}
                            </span>
                            <span className="text-xs text-[var(--text-secondary)]">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════
   Experience Section
   ═══════════════════════════════════════════ */

function ExperienceSection() {
    const [ref, revealed] = useScrollReveal(0.1)

    useEffect(() => {
        if (!revealed) return

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#experience .s-header',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
            })
            .add({
                targets: '#experience .exp-card',
                opacity: [0, 1],
                translateX: [-40, 0],
                duration: 700,
                delay: anime.stagger(150),
            }, 300)
            .add({
                targets: '#experience .ach-heading',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
            }, 600)
            .add({
                targets: '#experience .ach-card',
                opacity: [0, 1],
                translateY: [25, 0],
                scale: [0.96, 1],
                duration: 500,
                delay: anime.stagger(50),
            }, 800)
    }, [revealed])

    return (
        <section ref={ref} id="experience" className="portfolio-section relative">
            <StaggerDecor color="var(--node-2)" revealed={revealed} position="left" />
            <div className="container">
                <SectionHeader num="02" label="Experience" color="var(--node-2)" />

                <div className="space-y-6 mb-12">
                    {EXPERIENCES.map((exp) => (
                        <div
                            key={exp.role}
                            className="exp-card glass-card p-6"
                            style={{ opacity: 0, borderLeft: '2px solid var(--node-2)' }}
                        >
                            <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">{exp.role}</h4>
                            <p className="text-xs font-medium mb-1" style={{ color: 'var(--node-2)' }}>{exp.org}</p>
                            <p className="text-[10px] text-[var(--text-muted)] mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
                                {exp.period}
                            </p>
                            <ul className="space-y-2">
                                {exp.desc.map((d, i) => (
                                    <li key={i} className="flex gap-2.5 text-xs text-[var(--text-secondary)] leading-relaxed">
                                        <span
                                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                            style={{ background: 'var(--node-2)' }}
                                        />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <h4
                    className="ach-heading text-sm font-bold text-[var(--text-primary)] mb-5"
                    style={{ opacity: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                    ACHIEVEMENTS
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACHIEVEMENTS.map((ach) => (
                        <div
                            key={ach.title}
                            className="ach-card glass-card p-4 flex flex-col justify-between"
                            style={{ opacity: 0 }}
                        >
                            <div>
                                <span
                                    className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-3"
                                    style={{
                                        background: `${LEVEL_COLORS[ach.level]}15`,
                                        color: LEVEL_COLORS[ach.level],
                                        border: `1px solid ${LEVEL_COLORS[ach.level]}25`,
                                    }}
                                >
                                    {ach.level}
                                </span>
                                <h5 className="text-xs font-semibold text-[var(--text-primary)] leading-snug mb-1">
                                    {ach.title}
                                </h5>
                            </div>
                            <p className="text-[10px] text-[var(--text-muted)] mt-2">{ach.org} · {ach.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════
   Projects Section
   ═══════════════════════════════════════════ */

function ProjectsSection() {
    const [ref, revealed] = useScrollReveal(0.08)

    useEffect(() => {
        if (!revealed) return

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#projects .s-header',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
            })
            .add({
                targets: '#projects .proj-card',
                opacity: [0, 1],
                translateY: [40, 0],
                scale: [0.96, 1],
                duration: 600,
                delay: anime.stagger(70),
            }, 300)
    }, [revealed])

    return (
        <section ref={ref} id="projects" className="portfolio-section relative">
            <StaggerDecor color="var(--node-3)" revealed={revealed} position="right" />
            <div className="container">
                <SectionHeader num="03" label="Projects" color="var(--node-3)" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.title}
                            className="proj-card glass-card p-5 relative group"
                            style={{ opacity: 0, cursor: 'default' }}
                            onMouseEnter={(e) => {
                                anime({
                                    targets: e.currentTarget,
                                    translateY: -4,
                                    duration: 300,
                                    easing: 'easeOutCubic',
                                })
                            }}
                            onMouseLeave={(e) => {
                                anime({
                                    targets: e.currentTarget,
                                    translateY: 0,
                                    duration: 300,
                                    easing: 'easeOutCubic',
                                })
                            }}
                        >
                            {/* Number watermark */}
                            <span
                                className="absolute top-2 right-3 text-4xl font-black pointer-events-none select-none"
                                style={{ color: 'var(--node-3)', opacity: 0.04 }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>

                            <div
                                className="w-8 h-0.5 rounded-full mb-4"
                                style={{ background: 'var(--node-3)' }}
                            />
                            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2">
                                {p.title}
                            </h4>
                            <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                                {p.description}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {p.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                                        style={{
                                            background: 'rgba(5,150,105,0.08)',
                                            color: 'var(--node-3)',
                                            border: '1px solid rgba(5,150,105,0.18)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════
   Skills Section
   ═══════════════════════════════════════════ */

function SkillsSection() {
    const [ref, revealed] = useScrollReveal(0.1)

    useEffect(() => {
        if (!revealed) return

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#skills .s-header',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
            })
            .add({
                targets: '#skills .skill-heading',
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 500,
            }, 200)
            .add({
                targets: '#skills .skill-row',
                opacity: [0, 1],
                translateX: [-30, 0],
                duration: 600,
                delay: anime.stagger(80),
            }, 400)
            .add({
                targets: '#skills .tech-heading',
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 500,
            }, 800)
            .add({
                targets: '#skills .tool-tag',
                opacity: [0, 1],
                scale: [0.8, 1],
                translateY: [10, 0],
                duration: 400,
                delay: anime.stagger(25),
            }, 1000)
            .add({
                targets: '#skills .other-heading',
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 500,
            }, 1200)
            .add({
                targets: '#skills .other-tag',
                opacity: [0, 1],
                scale: [0.8, 1],
                translateY: [10, 0],
                duration: 400,
                delay: anime.stagger(25),
            }, 1400)
    }, [revealed])

    return (
        <section ref={ref} id="skills" className="portfolio-section relative">
            <StaggerDecor color="var(--node-4)" revealed={revealed} position="left" />
            <div className="container">
                <SectionHeader num="04" label="Skills" color="var(--node-4)" />

                <h4
                    className="skill-heading text-sm font-bold text-[var(--text-primary)] mb-6"
                    style={{ opacity: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                    CORE COMPETENCIES
                </h4>

                <div className="space-y-5 mb-12" style={{ maxWidth: 600 }}>
                    {SKILL_BARS.map((skill, i) => (
                        <div key={skill.name} className="skill-row" style={{ opacity: 0 }}>
                            <div className="flex justify-between mb-1.5">
                                <span className="text-xs font-medium text-[var(--text-secondary)]">
                                    {skill.name}
                                </span>
                                <span
                                    className="text-[10px] font-semibold"
                                    style={{ color: 'var(--node-4)', fontFamily: 'var(--font-mono)' }}
                                >
                                    {skill.level}%
                                </span>
                            </div>
                            <div
                                className="w-full h-1.5 rounded-full overflow-hidden"
                                style={{ background: 'var(--bg-deeper)' }}
                            >
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: revealed ? `${skill.level}%` : '0%',
                                        background: `linear-gradient(90deg, var(--node-4), rgba(245,158,11,0.6))`,
                                        transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transitionDelay: `${0.5 + i * 0.1}s`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <h4
                    className="tech-heading text-sm font-bold text-[var(--text-primary)] mb-4"
                    style={{ opacity: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                    TECHNOLOGIES
                </h4>
                <div className="flex flex-wrap gap-2 mb-10">
                    {TOOLS.map((tool) => (
                        <span
                            key={tool}
                            className="tool-tag glass-card px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--node-4)] hover:border-[var(--node-4)] transition-colors duration-200 cursor-default"
                            style={{ opacity: 0 }}
                        >
                            {tool}
                        </span>
                    ))}
                </div>

                <h4
                    className="other-heading text-sm font-bold text-[var(--text-primary)] mb-4"
                    style={{ opacity: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}
                >
                    OTHER
                </h4>
                <div className="flex flex-wrap gap-2">
                    {OTHER_SKILLS.map((skill) => (
                        <span
                            key={skill}
                            className="other-tag glass-card px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--node-3)] hover:border-[var(--node-3)] transition-colors duration-200 cursor-default"
                            style={{ opacity: 0 }}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════
   Contact Section
   ═══════════════════════════════════════════ */

function ContactSection() {
    const [ref, revealed] = useScrollReveal(0.15)

    useEffect(() => {
        if (!revealed) return

        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '#contact .s-header',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 800,
            })
            .add({
                targets: '#contact .contact-text',
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
            }, 300)
            .add({
                targets: '#contact .social-link',
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 500,
                delay: anime.stagger(80),
                easing: 'easeOutBack',
            }, 500)
            .add({
                targets: '#contact .contact-email',
                opacity: [0, 1],
                translateY: [10, 0],
                duration: 500,
            }, 800)
            .add({
                targets: '#contact .contact-cta',
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 600,
            }, 1000)
            .add({
                targets: '#contact .contact-footer',
                opacity: [0, 0.5],
                duration: 800,
            }, 1200)
    }, [revealed])

    return (
        <section ref={ref} id="contact" className="portfolio-section relative">
            <div className="container">
                <SectionHeader num="05" label="Contact" color="var(--node-5)" />

                <div className="flex flex-col items-start">
                    <p
                        className="contact-text text-[var(--text-secondary)] text-base leading-relaxed mb-8 max-w-md"
                        style={{ opacity: 0 }}
                    >
                        Interested in collaborating or just want to chat?
                        Reach out through any of these channels — I&apos;d love to connect.
                    </p>

                    <div className="flex gap-4 mb-8">
                        {SOCIAL_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="social-link w-12 h-12 rounded-full glass-card flex items-center justify-center text-[var(--text-secondary)] transition-all duration-300 hover:text-[var(--node-5)] hover:border-[var(--node-5)] hover:scale-110"
                                style={{ opacity: 0 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d={link.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>

                    <p
                        className="contact-email text-sm text-[var(--text-secondary)] mb-10"
                        style={{ opacity: 0, fontFamily: 'var(--font-mono)' }}
                    >
                        aldofahrezy@gmail.com
                    </p>

                    <a
                        href="mailto:aldofahrezy@gmail.com"
                        className="contact-cta group inline-flex items-center gap-3 rounded-full font-semibold text-sm border transition-all duration-300 hover:bg-[rgba(79,70,229,0.06)]"
                        style={{
                            opacity: 0,
                            padding: '14px 40px',
                            borderColor: 'var(--node-5)',
                            color: 'var(--node-5)',
                        }}
                    >
                        Send Message
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    <p
                        className="contact-footer text-[10px] text-[var(--text-muted)] mt-20"
                        style={{ opacity: 0 }}
                    >
                        © {new Date().getFullYear()} Muhammad Aldo Fahrezy. Built with React &amp; anime.js
                    </p>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════ */

export default function DataPipeline() {
    return (
        <>
            <AboutSection />
            <SectionDivider />
            <ExperienceSection />
            <SectionDivider />
            <ProjectsSection />
            <SectionDivider />
            <SkillsSection />
            <SectionDivider />
            <ContactSection />
        </>
    )
}
