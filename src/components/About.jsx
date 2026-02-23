/**
 * About.jsx – About Me section
 * - CV-based bio and stats
 * - Slide-in animation triggered by IntersectionObserver
 * - Floating orbs background motion
 */
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

export default function About() {
    const sectionRef = useRef(null)
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        document.querySelectorAll('.about-orb').forEach((orb, i) => {
            anime({
                targets: orb,
                translateY: [0, anime.random(-40, 40)],
                translateX: [0, anime.random(-25, 25)],
                opacity: [0.15, 0.5],
                duration: anime.random(3000, 5000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: i * 400,
            })
        })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    setAnimated(true)

                    anime({
                        targets: '.about-text',
                        opacity: [0, 1],
                        translateX: [-60, 0],
                        duration: 800,
                        easing: 'easeOutCubic',
                    })

                    anime({
                        targets: '.about-stat',
                        opacity: [0, 1],
                        translateX: [60, 0],
                        scale: [0.8, 1],
                        delay: anime.stagger(120, { start: 200 }),
                        duration: 700,
                        easing: 'easeOutCubic',
                    })
                }
            },
            { threshold: 0.2 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [animated])

    const stats = [
        { value: '8+', label: 'Awards' },
        { value: '10+', label: 'Projects' },
        { value: '5+', label: 'Competitions' },
        { value: '3', label: 'Languages' },
    ]

    return (
        <section id="about" ref={sectionRef} className="relative">
            {/* Floating orbs */}
            <div aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="about-orb floating-orb"
                        style={{
                            width: Math.random() * 5 + 2,
                            height: Math.random() * 5 + 2,
                            background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)',
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            opacity: 0.15,
                            boxShadow: `0 0 6px ${i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}`,
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-20">
                    About <span className="gradient-text">Me</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <div className="about-text opacity-0">
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base md:text-lg">
                            I&apos;m <span className="text-[var(--text-primary)] font-semibold">Muhammad Aldo Fahrezy</span>,
                            a Computer Science student at <span className="text-[var(--text-primary)] font-semibold">Universitas Indonesia</span>,
                            passionate about AI/ML Engineering and Data Science. I build solutions that transform complex
                            data into actionable intelligence — from NLP-powered chatbots to real-time drowsiness detection systems.
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-base md:text-lg">
                            Beyond academics, I&apos;ve served as a <span className="text-[var(--text-primary)] font-semibold">Teaching Assistant</span> for
                            Linear Algebra, Statistics &amp; Probability, and Programming Foundations. I also curated a TEDx talk at Universitas Indonesia.
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed text-base md:text-lg">
                            I&apos;m fluent in Bahasa Indonesia, English, and have working proficiency in French.
                            Certified in Microsoft Word, Excel, Java, and Adobe Photoshop.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="about-stat opacity-0 glass-card accent-glow flex flex-col items-center justify-center p-8 text-center"
                            >
                                <span className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">
                                    {s.value}
                                </span>
                                <span className="text-xs md:text-sm text-[var(--text-secondary)]">
                                    {s.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
