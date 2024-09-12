import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Navbar from './partials/Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <App />
  </StrictMode>,
)
