import React from 'react'
import { Routes, Route } from 'react-router'
import HomePage from './Pages/HomePage.jsx'
import CreatePage from './Pages/CreatePage.jsx'
import NoteDetailPage from './Pages/NoteDetailPage.jsx'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div className='relative  h-full w-full'>
      <div className="absolute inset-0 -z-10 min-h-screen w-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00ff9D40_100%)]"></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App