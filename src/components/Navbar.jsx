/**
 * Navbar.jsx – Sticky navigation bar
 * - Fades in after scrolling past the hero
 * - Highlights active section using IntersectionObserver
 * - Mobile hamburger menu
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

    /* ---------- Show navbar after scrolling 100px ---------- */
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    /* ---------- Animate navbar on visibility change ---------- */
    useEffect(() => {
        if (navRef.current) {
            anime({
                targets: navRef.current,
                opacity: visible ? [0, 1] : [1, 0],
                translateY: visible ? [-20, 0] : [0, -20],
                duration: 400,
                easing: 'easeOutCubic',
            })
        }
    }, [visible])

    /* ---------- IntersectionObserver for active section ---------- */
    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id)
                })
            },
            { rootMargin: '-40% 0px -55% 0px' }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    /* ---------- Smooth scroll handler ---------- */
    const scrollTo = (id) => {
        setMenuOpen(false)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 opacity-0"
            style={{
                background: 'rgba(10,10,26,0.82)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderBottom: '1px solid var(--glass-border)',
                pointerEvents: visible ? 'auto' : 'none',
            }}
        >
            <div className="container flex items-center justify-between h-20">
                {/* Logo */}
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-lg font-bold cursor-pointer">
                    <span className="gradient-text">MA</span>
                    <span className="text-[var(--text-secondary)] font-light">Fahrezy</span>
                </button>

                {/* Desktop links */}
                <ul className="hidden md:flex gap-8">
                    {NAV_LINKS.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollTo(link.id)}
                                className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${active === link.id
                                    ? 'gradient-text'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                    }`}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMenuOpen((o) => !o)}
                    className="md:hidden flex flex-col gap-1.5 cursor-pointer"
                    aria-label="Toggle menu"
                >
                    <span
                        className="block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300"
                        style={menuOpen ? { transform: 'rotate(45deg) translate(3px, 3px)' } : {}}
                    />
                    <span
                        className="block w-6 h-0.5 bg-[var(--text-primary)] transition-opacity duration-300"
                        style={menuOpen ? { opacity: 0 } : {}}
                    />
                    <span
                        className="block w-6 h-0.5 bg-[var(--text-primary)] transition-transform duration-300"
                        style={menuOpen ? { transform: 'rotate(-45deg) translate(3px, -3px)' } : {}}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <ul className="md:hidden flex flex-col items-center gap-6 py-6 border-t border-[var(--glass-border)]">
                    {NAV_LINKS.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollTo(link.id)}
                                className={`text-base font-medium cursor-pointer ${active === link.id
                                    ? 'gradient-text'
                                    : 'text-[var(--text-secondary)]'
                                    }`}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
