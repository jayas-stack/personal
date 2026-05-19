import Aurora from './components/Aurora'
import Particles from './components/Particles'
import Home from './pages/Home'
import Letter from './pages/Letter'

export default function App() {
  return (
    <>
      <Aurora />
      <Particles />
      
      <div id="home">
        <Home />
      </div>
      <div id="letter">
        <Letter />
      </div>
    </>
  )
}