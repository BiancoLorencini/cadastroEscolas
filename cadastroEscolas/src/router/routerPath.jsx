import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Escola  from '../pages/listagemEscola/escola.jsx'
import App from '../App'


const routerPath = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/escola" element={<Escola />} />
      </Routes>
      <Outlet />
    </Router>
  )
}

export default routerPath
