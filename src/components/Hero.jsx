/**
 * Hero.jsx – Full-screen hero section with motion graphics
 * - Canvas particle network animation
 * - Animated grid background
 * - Morphing gradient blobs
 * - Scanline overlay
 * - Staggered text reveal + typing cursor
 */
import { useEffect, useRef, useCallback } from 'react'
import anime from 'animejs'

/* ---------- Particle Network (Canvas) ---------- */
function useParticleCanvas(canvasRef) {
    const animFrameRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let width = (canvas.width = canvas.offsetWidth)
        let height = (canvas.height = canvas.offsetHeight)
        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)

        const PARTICLE_COUNT = 70
        const CONNECTION_DIST = 140
        const particles = []

        class Particle {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.4
                this.vy = (Math.random() - 0.5) * 0.4
                this.radius = Math.random() * 1.5 + 0.5
                this.opacity = Math.random() * 0.5 + 0.2
            }
            update() {
                this.x += this.vx
                this.y += this.vy
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1
            }
            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`
                ctx.fill()
            }
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.15
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, width, height)
            particles.forEach((p) => {
                p.update()
                p.draw()
            })
            drawLines()
            animFrameRef.current = requestAnimationFrame(loop)
        }

        loop()

        const handleResize = () => {
            width = canvas.offsetWidth
            height = canvas.offsetHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            cancelAnimationFrame(animFrameRef.current)
            window.removeEventListener('resize', handleResize)
        }
    }, [canvasRef])
}

export default function Hero() {
    const canvasRef = useRef(null)
    useParticleCanvas(canvasRef)

    useEffect(() => {
        /* Staggered text reveal */
        anime({
            targets: '.hero-line',
            opacity: [0, 1],
            translateY: [40, 0],
            delay: anime.stagger(180, { start: 300 }),
            duration: 900,
            easing: 'easeOutExpo',
        })

        /* Typing cursor blink */
        anime({
            targets: '.typing-cursor',
            opacity: [1, 0],
            duration: 600,
            loop: true,
            direction: 'alternate',
            easing: 'steps(1)',
        })

        /* Floating morphing blobs */
        document.querySelectorAll('.hero-blob').forEach((blob, i) => {
            anime({
                targets: blob,
                translateX: () => anime.random(-100, 100),
                translateY: () => anime.random(-100, 100),
                scale: [1, anime.random(10, 14) / 10],
                duration: () => anime.random(5000, 8000),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: i * 600,
            })
        })

        /* Floating orbs – small accent dots */
        document.querySelectorAll('.hero-orb').forEach((orb, i) => {
            anime({
                targets: orb,
                translateY: [0, anime.random(-30, 30)],
                translateX: [0, anime.random(-20, 20)],
                opacity: [0.3, 0.8],
                duration: anime.random(2500, 4500),
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true,
                delay: i * 300,
            })
        })

        /* CTA button pulse */
        anime({
            targets: '.hero-cta',
            boxShadow: [
                '0 0 0px rgba(0,212,255,0.3)',
                '0 0 28px rgba(0,212,255,0.5)',
            ],
            duration: 1800,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
        })

        /* Pulse rings */
        anime({
            targets: '.pulse-ring',
            scale: [0.8, 1.6],
            opacity: [0.5, 0],
            duration: 3000,
            delay: anime.stagger(800),
            loop: true,
            easing: 'easeOutExpo',
        })
    }, [])

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden scanline-overlay"
            style={{ padding: 0 }}
        >
            {/* Animated grid background */}
            <div className="grid-bg" />

            {/* Particle canvas */}
            <canvas ref={canvasRef} className="particle-canvas" />

            {/* Morphing blobs */}
            <div aria-hidden="true">
                <div
                    className="hero-blob blob morph-shape"
                    style={{
                        width: 450,
                        height: 450,
                        background: 'radial-gradient(circle, rgba(0,212,255,0.3), transparent 70%)',
                        top: '5%',
                        left: '10%',
                    }}
                />
                <div
                    className="hero-blob blob morph-shape"
                    style={{
                        width: 500,
                        height: 500,
                        background: 'radial-gradient(circle, rgba(123,47,247,0.25), transparent 70%)',
                        bottom: '0%',
                        right: '5%',
                        animationDelay: '-3s',
                    }}
                />
                <div
                    className="hero-blob blob morph-shape"
                    style={{
                        width: 300,
                        height: 300,
                        background: 'radial-gradient(circle, rgba(0,212,255,0.15), transparent 70%)',
                        top: '55%',
                        left: '50%',
                        animationDelay: '-5s',
                    }}
                />
            </div>

            {/* Floating decorative orbs */}
            <div aria-hidden="true">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="hero-orb floating-orb"
                        style={{
                            width: Math.random() * 6 + 3,
                            height: Math.random() * 6 + 3,
                            background: i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)',
                            top: `${10 + Math.random() * 80}%`,
                            left: `${5 + Math.random() * 90}%`,
                            opacity: 0.3,
                            boxShadow: `0 0 8px ${i % 2 === 0 ? 'var(--accent-blue)' : 'var(--accent-purple)'}`,
                        }}
                    />
                ))}
            </div>

            {/* Pulse rings – center decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="pulse-ring absolute rounded-full border border-[var(--accent-blue)]"
                        style={{
                            width: 200 + i * 120,
                            height: 200 + i * 120,
                            opacity: 0,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="container relative z-10 flex flex-col items-center text-center">
                <p className="hero-line opacity-0 text-sm md:text-base font-medium tracking-widest uppercase text-[var(--accent-blue)] mb-4">
                    AI / ML Engineer &amp; Data Scientist
                </p>

                <h1 className="hero-line opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-2">
                    <span className="gradient-text">Muhammad Aldo</span>
                </h1>

                <h1 className="hero-line opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6">
                    <span className="text-[var(--text-primary)]">Fahrezy</span>
                    <span className="typing-cursor inline-block w-[4px] h-[0.85em] bg-[var(--accent-blue)] ml-2 align-middle rounded-sm" />
                </h1>

                <p className="hero-line opacity-0 max-w-2xl mx-auto text-[var(--text-secondary)] text-base md:text-lg mb-12 leading-relaxed" style={{ textAlign: 'center' }}>
                    Turning complex data into actionable intelligence through machine
                    learning, deep learning, and data-driven storytelling.
                </p>

                <div className="hero-line opacity-0 flex flex-wrap gap-6 justify-center">
                    <a
                        href="#projects"
                        className="hero-cta inline-flex items-center gap-3 rounded-full font-semibold text-sm text-[var(--bg-primary)]"
                        style={{ background: 'var(--accent-gradient)', padding: '16px 48px', whiteSpace: 'nowrap' }}
                    >
                        View Projects
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 rounded-full font-semibold text-sm border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent-blue)] transition-colors duration-300"
                        style={{ padding: '16px 48px', whiteSpace: 'nowrap' }}
                    >
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 w-full h-32 z-10"
                style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
            />
        </section>
    )
}
