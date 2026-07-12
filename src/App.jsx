import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Essays from './pages/Essays'
import Poems from './pages/Poems'
import ShortStories from './pages/ShortStories'
import Photography from './pages/Photography'
import Research from './pages/Research'
import About from './pages/About'

function App() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)

  return (
    <Router>
      <Navbar activeVideoIndex={activeVideoIndex} />
      <Routes>
        <Route
          path="/"
          element={<Home activeVideoIndex={activeVideoIndex} onVideoChange={setActiveVideoIndex} />}
        />
        <Route path="/essays" element={<Essays />} />
        <Route path="/poems" element={<Poems />} />
        <Route path="/short-stories" element={<ShortStories />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/research" element={<Research />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
