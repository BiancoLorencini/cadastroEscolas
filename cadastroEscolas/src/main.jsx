import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterPath from './router/routerPath.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterPath />
  </StrictMode>,
)
