/**
 * Hero.jsx – Animated stagger grid hero
 *
 * Signature anime.js-style dot grid with ripple wave animations.
 * Clean professional text with staggered entrance timeline.
 */
import { useEffect, useRef } from 'react'
import anime from 'animejs'

const COLS = 15
const ROWS = 15
const DOT_SIZE = 4
const GAP = 30

export default function Hero() {
    const gridRef = useRef(null)
    const animRef = useRef(null)

    useEffect(() => {
        if (!gridRef.current) return
        const dots = gridRef.current.querySelectorAll('.grid-dot')
        if (!dots.length) return

        const origins = ['center', [0, 0], [COLS - 1, ROWS - 1], [0, ROWS - 1], [COLS - 1, 0]]
        let waveIdx = 0

        const playWave = () => {
            const from = origins[waveIdx % origins.length]
            waveIdx++

            animRef.current = anime({
                targets: dots,
                scale: [
                    { value: 1.5, duration: 800, easing: 'easeInOutQuad' },
                    { value: 1, duration: 600, easing: 'easeOutQuad' },
                ],
                opacity: [
                    { value: 0.7, duration: 800, easing: 'easeInOutQuad' },
                    { value: 0.15, duration: 600, easing: 'easeOutQuad' },
                ],
                borderRadius: [
                    { value: '3px', duration: 800 },
                    { value: '50%', duration: 600 },
                ],
                delay: anime.stagger(50, { grid: [COLS, ROWS], from }),
                complete: () => {
                    setTimeout(playWave, 2000)
                },
            })
        }

        // Entrance: dots appear with stagger from center
        animRef.current = anime({
            targets: dots,
            opacity: [0, 0.15],
            scale: [0, 1],
            delay: anime.stagger(25, { grid: [COLS, ROWS], from: 'center' }),
            duration: 600,
            easing: 'easeOutExpo',
            complete: () => setTimeout(playWave, 800),
        })

        // Text entrance timeline
        const tl = anime.timeline({ easing: 'easeOutExpo' })

        tl.add({
            targets: '.hero-label',
            opacity: [0, 1],
            translateY: [-15, 0],
            duration: 800,
        }, 500)
        .add({
            targets: '.hero-title-line',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: anime.stagger(100),
        }, 700)
        .add({
            targets: '.hero-desc',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
        }, 1300)
        .add({
            targets: '.hero-cta',
            opacity: [0, 1],
            translateY: [15, 0],
            duration: 600,
            delay: anime.stagger(80),
        }, 1600)
        .add({
            targets: '.hero-scroll',
            opacity: [0, 0.4],
            translateY: [10, 0],
            duration: 600,
        }, 2200)

        // Scroll arrow bounce
        anime({
            targets: '.scroll-arrow',
            translateY: [0, 5],
            duration: 700,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
        })

        // Subtle CTA glow pulse
        anime({
            targets: '.hero-cta-primary',
            boxShadow: [
                '0 0 0px rgba(8,145,178,0.0)',
                '0 0 24px rgba(8,145,178,0.18)',
            ],
            duration: 2200,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
        })

        return () => {
            if (animRef.current) animRef.current.pause()
        }
    }, [])

    return (
        <section
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ padding: 0 }}
        >
            {/* Animated stagger grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    ref={gridRef}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${COLS}, ${DOT_SIZE}px)`,
                        gap: `${GAP - DOT_SIZE}px`,
                    }}
                >
                    {Array.from({ length: COLS * ROWS }).map((_, i) => (
                        <div
                            key={i}
                            className="grid-dot"
                            style={{
                                width: DOT_SIZE,
                                height: DOT_SIZE,
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                opacity: 0,
                                willChange: 'transform, opacity',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Radial vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at 50% 50%, transparent 12%, var(--bg-primary) 65%)',
                }}
            />

            {/* Content */}
            <div
                className="container relative z-10 flex flex-col items-center text-center"
                style={{ maxWidth: 800 }}
            >
                <p
                    className="hero-label opacity-0 section-label mb-6"
                    style={{ color: 'var(--accent)' }}
                >
                    AI / ML ENGINEER &amp; DATA SCIENTIST
                </p>

                <h1 className="hero-title-line opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-2">
                    <span className="gradient-text">Muhammad Aldo</span>
                </h1>
                <h1 className="hero-title-line opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-10">
                    Fahrezy
                </h1>

                <p className="hero-desc opacity-0 max-w-xl mx-auto text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-12">
                    Turning complex data into actionable intelligence through machine
                    learning, deep learning, and data-driven storytelling.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                    <a
                        href="#projects"
                        className="hero-cta hero-cta-primary opacity-0 group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300"
                        style={{ background: 'var(--accent-gradient)', color: '#fff' }}
                    >
                        View Projects
                        <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                    <a
                        href="#contact"
                        className="hero-cta opacity-0 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold text-sm border border-[var(--glass-border)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors duration-300"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span
                    className="text-[9px] tracking-[0.25em] text-[var(--text-muted)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                >
                    SCROLL
                </span>
                <svg
                    className="scroll-arrow w-3.5 h-3.5 text-[var(--text-muted)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                </svg>
            </div>

            {/* Bottom fade */}
            <div
                className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}
            />
        </section>
    )
}
