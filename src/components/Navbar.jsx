/**
 * Navbar.jsx – Clean floating navigation
 *
 * Minimal design with smooth scroll-based visibility.
 * Active section tracking via IntersectionObserver.
 */
import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const [active, setActive] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef(null)

    /* --- Show on scroll --- */
    useEffect(() => {
        const handle = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', handle, { passive: true })
        return () => window.removeEventListener('scroll', handle)
    }, [])

    /* --- Animate visibility --- */
    useEffect(() => {
        if (navRef.current) {
            anime({
                targets: navRef.current,
                opacity: visible ? [0, 1] : [1, 0],
                translateY: visible ? [-10, 0] : [0, -10],
                duration: 350,
                easing: 'easeOutCubic',
            })
        }
    }, [visible])

    /* --- Track active section --- */
    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) setActive(e.target.id)
                })
            },
            { rootMargin: '-40% 0px -55% 0px' }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const scrollTo = (id) => {
        setMenuOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 opacity-0"
            style={{
                background: 'rgba(250,251,252,0.82)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--glass-border)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <div className="container flex items-center justify-between h-14">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="cursor-pointer"
                >
                    <span
                        className="text-sm font-bold tracking-wide"
                        style={{ fontFamily: 'var(--font-mono)' }}
                    >
                        <span className="gradient-text">aldo</span>
                        <span className="text-[var(--text-muted)]">.dev</span>
                    </span>
                </button>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className="relative px-4 py-2 cursor-pointer group"
                        >
                            <span
                                className="text-[13px] font-medium transition-colors duration-200"
                                style={{
                                    color: active === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                                }}
                            >
                                {link.label}
                            </span>
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px rounded-full transition-all duration-300"
                                style={{
                                    width: active === link.id ? '50%' : '0%',
                                    background: 'var(--accent)',
                                    opacity: active === link.id ? 0.6 : 0,
                                }}
                            />
                        </button>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className="block w-5 h-px bg-[var(--text-primary)] transition-transform duration-300"
                        style={menuOpen ? { transform: 'rotate(45deg) translate(2.5px, 2.5px)' } : {}}
                    />
                    <span
                        className="block w-5 h-px bg-[var(--text-primary)] transition-opacity duration-300"
                        style={menuOpen ? { opacity: 0 } : {}}
                    />
                    <span
                        className="block w-5 h-px bg-[var(--text-primary)] transition-transform duration-300"
                        style={menuOpen ? { transform: 'rotate(-45deg) translate(2.5px, -2.5px)' } : {}}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden px-8 py-6 border-t border-[var(--glass-border)]">
                    {NAV_LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => scrollTo(link.id)}
                            className="block w-full text-left py-3 cursor-pointer"
                        >
                            <span
                                className="text-sm font-medium"
                                style={{
                                    color: active === link.id ? 'var(--accent)' : 'var(--text-secondary)',
                                }}
                            >
                                {link.label}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    )
}
