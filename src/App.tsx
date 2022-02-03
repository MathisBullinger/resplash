import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'screens/Home'
import Navigation from 'components/Mainnav'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
