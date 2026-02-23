/**
 * App.jsx – Root layout component
 * Composes all sections into the portfolio page
 * Includes noise texture overlay for premium feel
 */
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] noise-overlay">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </div>
  )
}

export default App
