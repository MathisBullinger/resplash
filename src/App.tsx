import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'screens/Home'
import Favorites from 'screens/Favorites'
import PhotoModal from 'screens/PhotoModal'
import Navigation from 'components/Mainnav'

const App: React.FC = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="photos/:id" element={<PhotoModal />} />
      </Routes>
    </>
  )
}

export default App
