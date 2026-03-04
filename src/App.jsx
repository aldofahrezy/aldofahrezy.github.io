/**
 * App.jsx – Root layout component
 * Portfolio with sophisticated anime.js animations
 */
import DataPipeline from './components/DataPipeline'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      <main>
        <Hero />
        <DataPipeline />
      </main>
    </div>
  )
}

export default App
