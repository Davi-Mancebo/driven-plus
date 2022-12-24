import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app'
import './assets/css/reset.css'
import { AuthProvider } from './provider/provider'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
