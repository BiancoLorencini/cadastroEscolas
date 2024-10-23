import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { EscolaProvider } from '../context/escolaContext/escolaProvider'
import Turma from '../pages/listagemTurma/turmas'
import Escola from '../pages/listagemEscola/escola'
import App from '../App'


const routerPath = () => {
  return (
    <Router>
      <EscolaProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/escola" element={<Escola />} />
        <Route path="/turma" element={<Turma />} />
      </Routes>
      <Outlet />
      </EscolaProvider>
    </Router>
  )
}

export default routerPath
