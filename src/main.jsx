import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthProvider>
       <App />
     </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)

//odd that navbar works when strict mode is not there but lags with it
