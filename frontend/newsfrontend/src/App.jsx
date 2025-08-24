import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import VerifyNews from './pages/VerifyNews';
import Home from './pages/Home';
import IndiaTrends from './pages/IndiaTrends';
import WorldTrends from './pages/WorldTrends';
import Community from './pages/Community';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <main className='min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/verify" element={<VerifyNews />} />
          <Route path="/india" element={<IndiaTrends />} />
          <Route path="/world" element={<WorldTrends />} />
          <Route path="/community" element={<Community />} />
      </Routes>
    </main>
    <Footer />
    </>
  )
}

export default App
