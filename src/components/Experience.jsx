/**
 * Experience.jsx – Experience & Achievements section
 * - Timeline-based layout for experience
 * - Achievement cards with stagger animation
 * - IntersectionObserver + anime.js
 */
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

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
        color: '#00d4ff',
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
        color: '#7b2ff7',
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

export default function Experience() {
    const sectionRef = useRef(null)
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        document.querySelectorAll('.exp-orb').forEach((orb, i) => {
            anime({
                targets: orb,
                translateY: [0, anime.random(-35, 35)],
                translateX: [0, anime.random(-20, 20)],
                opacity: [0.1, 0.45],
                duration: anime.random(3000, 5000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: i * 300,
            })
        })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    setAnimated(true)

                    anime({
                        targets: '.exp-card',
                        opacity: [0, 1],
                        translateX: [-40, 0],
                        delay: anime.stagger(150),
                        duration: 700,
                        easing: 'easeOutCubic',
                    })

                    anime({
                        targets: '.ach-card',
                        opacity: [0, 1],
                        scale: [0.85, 1],
                        delay: anime.stagger(80, { start: 300 }),
                        duration: 500,
                        easing: 'easeOutBack',
                    })
                }
            },
            { threshold: 0.05 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [animated])

    const levelColors = {
        International: '#00d4ff',
        National: '#7b2ff7',
        University: '#a855f7',
    }

    return (
        <section id="experience" ref={sectionRef} className="relative">
            {/* Floating orbs */}
            <div aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="exp-orb floating-orb"
                        style={{
                            width: Math.random() * 5 + 2,
                            height: Math.random() * 5 + 2,
                            background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)',
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            opacity: 0.1,
                            boxShadow: `0 0 6px ${i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}`,
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10">
                {/* Experience */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
                    Experience &amp; <span className="gradient-text">Achievements</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {EXPERIENCES.map((exp) => (
                        <div
                            key={exp.role}
                            className="exp-card opacity-0 glass-card p-8 md:p-10"
                        >
                            <div
                                className="w-10 h-1 rounded-full mb-6"
                                style={{ background: exp.color }}
                            />
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                                {exp.role}
                            </h3>
                            <p className="text-sm font-medium mb-1" style={{ color: exp.color }}>
                                {exp.org}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mb-6">
                                {exp.period}
                            </p>
                            <ul className="space-y-3">
                                {exp.desc.map((d, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Achievements */}
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-14">
                    Notable <span className="gradient-text">Achievements</span>
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {ACHIEVEMENTS.map((ach) => (
                        <div
                            key={ach.title}
                            className="ach-card opacity-0 glass-card p-6 flex flex-col justify-between"
                        >
                            <div>
                                <span
                                    className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4"
                                    style={{
                                        background: `${levelColors[ach.level]}18`,
                                        color: levelColors[ach.level],
                                        border: `1px solid ${levelColors[ach.level]}30`,
                                    }}
                                >
                                    {ach.level}
                                </span>
                                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2 leading-snug">
                                    {ach.title}
                                </h4>
                            </div>
                            <div className="mt-4">
                                <p className="text-xs text-[var(--text-secondary)]">{ach.org}</p>
                                <p className="text-xs text-[var(--text-secondary)] opacity-60">{ach.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
