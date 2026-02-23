/**
 * Projects.jsx – Project showcase section
 * - Real CV-based project data
 * - Stagger card entrance + tilt/glow hover
 * - Animated grid background + floating orbs
 */
import { useEffect, useRef, useState, useCallback } from 'react'
import anime from 'animejs'

const PROJECTS = [
    {
        id: 1,
        title: 'AWMI Medical Tourism Ecosystem',
        description:
            'A comprehensive digital ecosystem for the Indonesian Medical Tourism Association — Patient Frontend, Admin Backend, and Hospital Portal with NLP-based AI Chatbot for symptom triage.',
        tags: ['NLP', 'AI Chatbot', 'Full-Stack', 'PKM-PI'],
        color: '#00d4ff',
    },
    {
        id: 2,
        title: 'Seismic S-Wave Arrival Prediction',
        description:
            'Predictive regression model to estimate Secondary Wave arrival times using the STEAD dataset, engineered for earthquake early warning systems.',
        tags: ['Regression', 'Seismology', 'RMSE Optimization'],
        color: '#7b2ff7',
    },
    {
        id: 3,
        title: 'GarisNadi – Batik Pattern Database',
        description:
            'Online open database of Batik patterns in Indonesia with AI-powered pattern recognition and generation. Built with Django, TensorFlow, and Tailwind CSS.',
        tags: ['TensorFlow', 'Django', 'Computer Vision'],
        color: '#00d4ff',
    },
    {
        id: 4,
        title: 'GarudaHacks 6.0 – AI Image Classifier',
        description:
            'Hackathon finalist project: website with OpenAI/Gemini API integration and a custom TensorFlow model for image classification. Built with Next.js and Django.',
        tags: ['Next.js', 'TensorFlow', 'Hackathon'],
        color: '#7b2ff7',
    },
    {
        id: 5,
        title: 'Tiket Bisa',
        description:
            'A startup offering online ticket-selling services for Indonesian football event organizers.',
        tags: ['Startup', 'E-Commerce', 'Football'],
        color: '#00d4ff',
    },
    {
        id: 6,
        title: 'Jitu Academy – UTBK Online Tryout',
        description:
            'An online tryout platform and engine for the UTBK tutoring startup, Jitu Academy.',
        tags: ['EdTech', 'Platform', 'Assessment'],
        color: '#7b2ff7',
    },
    {
        id: 7,
        title: 'BEM Chatting Platform',
        description:
            'A real-time chatting platform with websockets for BEM members. Built with React, Next.js, TypeScript, and MongoDB.',
        tags: ['React', 'WebSocket', 'MongoDB'],
        color: '#00d4ff',
    },
    {
        id: 8,
        title: 'LigaPass – PWA Ticket Sales',
        description:
            'Progressive Web App providing ticket sales services for the Indonesian Super League. Built with Django and Flutter.',
        tags: ['PWA', 'Django', 'Flutter'],
        color: '#7b2ff7',
    },
    {
        id: 9,
        title: 'PT INALUM Smart Factory Solution',
        description:
            '1st place IT business case solution implementing ERP, SCM, MES, SCADA, PLC with IoT and AI to automate inventory tracking and boost production efficiency by 30% NPV.',
        tags: ['IoT', 'ERP', 'Data Science'],
        color: '#00d4ff',
    },
    {
        id: 10,
        title: 'Salasa Daya Utamaindo',
        description:
            'A company profile and product catalogue website for a local company in Batam.',
        tags: ['Web Dev', 'Company Profile'],
        color: '#7b2ff7',
    },
]

function ProjectCard({ project, index }) {
    const cardRef = useRef(null)

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current
        if (!card) return
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const rotateX = ((y - centerY) / centerY) * -6
        const rotateY = ((x - centerX) / centerX) * 6

        anime({
            targets: card,
            rotateX,
            rotateY,
            duration: 300,
            easing: 'easeOutCubic',
        })

        card.style.setProperty('--glow-x', `${x}px`)
        card.style.setProperty('--glow-y', `${y}px`)
    }, [])

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current
        if (!card) return
        anime({
            targets: card,
            rotateX: 0,
            rotateY: 0,
            duration: 500,
            easing: 'easeOutElastic(1, .6)',
        })
    }, [])

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="project-card glass-card relative p-8 md:p-10 cursor-default"
            style={{ perspective: '800px', transformStyle: 'preserve-3d', overflow: 'hidden' }}
        >
            <div
                className="glow-overlay pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl"
                style={{
                    background:
                        'radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(0,212,255,0.12), transparent 60%)',
                }}
            />

            <span
                className="absolute top-3 right-4 text-6xl font-black pointer-events-none select-none"
                style={{ color: `${project.color}08` }}
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            <div
                className="w-10 h-1 rounded-full mb-6"
                style={{ background: project.color }}
            />

            <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--text-primary)] relative z-10">
                {project.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed relative z-10">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-2 relative z-10">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                            background: `${project.color}18`,
                            color: project.color,
                            border: `1px solid ${project.color}30`,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default function Projects() {
    const gridRef = useRef(null)
    const [animated, setAnimated] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !animated) {
                    setAnimated(true)

                    anime({
                        targets: '.project-card',
                        opacity: [0, 1],
                        translateY: [50, 0],
                        scale: [0.92, 1],
                        delay: anime.stagger(100, { grid: [2, 5], from: 'first' }),
                        duration: 700,
                        easing: 'easeOutCubic',
                    })
                }
            },
            { threshold: 0.05 }
        )

        if (gridRef.current) observer.observe(gridRef.current)
        return () => observer.disconnect()
    }, [animated])

    useEffect(() => {
        document.querySelectorAll('.proj-orb').forEach((orb, i) => {
            anime({
                targets: orb,
                translateY: [0, anime.random(-35, 35)],
                translateX: [0, anime.random(-20, 20)],
                opacity: [0.1, 0.4],
                duration: anime.random(3000, 5000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: i * 350,
            })
        })
    }, [])

    useEffect(() => {
        const style = document.createElement('style')
        style.textContent = `.project-card:hover .glow-overlay { opacity: 1 !important; }`
        document.head.appendChild(style)
        return () => style.remove()
    }, [])

    return (
        <section id="projects" className="relative">
            <div className="grid-bg" />

            <div aria-hidden="true">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="proj-orb floating-orb"
                        style={{
                            width: Math.random() * 5 + 2,
                            height: Math.random() * 5 + 2,
                            background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)',
                            top: `${5 + Math.random() * 90}%`,
                            left: `${5 + Math.random() * 90}%`,
                            opacity: 0.1,
                            boxShadow: `0 0 6px ${i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}`,
                        }}
                    />
                ))}
            </div>

            <div className="container relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-center text-[var(--text-secondary)] mb-20 max-w-lg mx-auto" style={{ textAlign: 'center' }}>
                    A selection of startups, competitions, and coursework spanning AI, full-stack development,
                    and data science.
                </p>

                <div
                    ref={gridRef}
                    className="grid sm:grid-cols-2 gap-8"
                >
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
