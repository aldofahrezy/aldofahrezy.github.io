/**
 * Skills.jsx – Skills section
 * - CV-based skills data
 * - Animated progress bars + badge pop-in
 * - IntersectionObserver + anime.js
 */
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

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

export default function Skills() {
    const sectionRef = useRef(null)
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        document.querySelectorAll('.skills-orb').forEach((orb, i) => {
            anime({
                targets: orb,
                translateY: [0, anime.random(-30, 30)],
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
                        targets: '.skill-bar-fill',
                        width: (el) => el.getAttribute('data-level') + '%',
                        duration: 1200,
                        delay: anime.stagger(100),
                        easing: 'easeOutExpo',
                    })

                    document.querySelectorAll('.skill-bar-fill').forEach((el) => {
                        const target = parseInt(el.getAttribute('data-level'), 10)
                        anime({
                            targets: { val: 0 },
                            val: target,
                            round: 1,
                            duration: 1200,
                            easing: 'easeOutExpo',
                            update: (anim) => {
                                const counter = el.querySelector('.skill-counter')
                                if (counter) counter.textContent = `${anim.animations[0].currentValue}%`
                            },
                        })
                    })

                    anime({
                        targets: '.skill-badge',
                        opacity: [0, 1],
                        scale: [0.5, 1],
                        delay: anime.stagger(50, { start: 400 }),
                        duration: 500,
                        easing: 'easeOutBack',
                    })

                    anime({
                        targets: '.skills-heading',
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 700,
                        easing: 'easeOutCubic',
                    })
                }
            },
            { threshold: 0.15 }
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [animated])

    return (
        <section id="skills" ref={sectionRef} className="relative">
            <div aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="skills-orb floating-orb"
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

            <div
                className="blob morph-shape"
                aria-hidden="true"
                style={{
                    width: 350,
                    height: 350,
                    background: 'radial-gradient(circle, rgba(123,47,247,0.12), transparent 70%)',
                    top: '20%',
                    right: '-5%',
                }}
            />

            <div className="container relative z-10">
                <h2 className="skills-heading text-3xl md:text-4xl font-bold text-center mb-20">
                    Skills &amp; <span className="gradient-text">Tools</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-20">
                    {/* Progress bars */}
                    <div>
                        <h3 className="text-lg font-semibold mb-8 text-[var(--text-primary)]">Core Competencies</h3>
                        <div className="space-y-8">
                            {SKILL_BARS.map((skill) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-[var(--text-secondary)]">
                                            {skill.name}
                                        </span>
                                    </div>
                                    <div className="w-full h-2.5 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                                        <div
                                            className="skill-bar-fill h-full rounded-full relative"
                                            data-level={skill.level}
                                            style={{
                                                width: 0,
                                                background: 'var(--accent-gradient)',
                                            }}
                                        >
                                            <span className="skill-counter absolute -top-7 right-0 text-xs font-semibold text-[var(--accent-blue)]">
                                                0%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tool badges */}
                    <div>
                        <h3 className="text-lg font-semibold mb-8 text-[var(--text-primary)]">Technologies &amp; Frameworks</h3>
                        <div className="flex flex-wrap gap-3 mb-12">
                            {TOOLS.map((tool) => (
                                <span
                                    key={tool}
                                    className="skill-badge opacity-0 glass-card px-4 py-2.5 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--glass-border)] hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] transition-colors duration-300 cursor-default"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-lg font-semibold mb-8 text-[var(--text-primary)]">Other Skills</h3>
                        <div className="flex flex-wrap gap-3">
                            {OTHER_SKILLS.map((skill) => (
                                <span
                                    key={skill}
                                    className="skill-badge opacity-0 glass-card px-4 py-2.5 rounded-full text-sm font-medium text-[var(--text-secondary)] border border-[var(--glass-border)] hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)] transition-colors duration-300 cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
