import Aurora from './components/Aurora'
import Particles from './components/Particles'
import Home from './pages/Home'
import Letter from './pages/Letter'
import Gallery from './pages/Gallery'

export default function App() {
  return (
    <>
      <Aurora />
      <Particles />
      
      <main>
        <section id="home">
          <Home />
        </section>
        <section id="letter">
          <Letter />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
      </main>
    </>
  )
}