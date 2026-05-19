import { useState } from 'react'
import Aurora from './components/Aurora'
import Particles from './components/Particles'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Letter from './pages/Letter'

export default function App() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(null)

  return (
    <>
      <Aurora />
      <Particles />
      
      <div id="home">
        <Home openGift={() => setActivePhotoIdx(0)} />
      </div>
      <div id="gallery">
        <Gallery activeIdx={activePhotoIdx} setActiveIdx={setActivePhotoIdx} />
      </div>
      <div id="letter">
        <Letter />
      </div>
    </>
  )
}