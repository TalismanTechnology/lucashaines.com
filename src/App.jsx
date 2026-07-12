import { useState } from 'react'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Photography from './pages/Photography'
import Writing from './pages/Writing'
import WritingDetail from './pages/WritingDetail'

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
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<WritingDetail />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/essays" element={<Navigate to="/writing" replace />} />
        <Route path="/poems" element={<Navigate to="/writing" replace />} />
        <Route path="/short-stories" element={<Navigate to="/writing" replace />} />
        <Route path="/research" element={<Navigate to="/writing" replace />} />
      </Routes>
    </Router>
  )
}

export default App
