import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import PostInfo from './pages/PostInfo.jsx';



function App() {

  return (
    <>
      <Routes>
        <Route path='pic-test-task' element={<Home />} />
        <Route path='pic-test-task/post/:id' element={<PostInfo />} />
      </Routes>
    </>
  )
}

export default App
