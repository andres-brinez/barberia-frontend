import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/ui/styles/global.css' // Importación de estilos globales; 
import App from './app/ui/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
