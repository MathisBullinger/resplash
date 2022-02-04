import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'screens/Home'
import Navigation from 'components/Mainnav'
import Modal from 'components/atoms/Modal'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="photo/:id" element={<Modal />} />
      </Routes>
    </>
  )
}

export default App
