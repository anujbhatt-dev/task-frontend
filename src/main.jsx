import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


const backendRemote = "https://task-backend-542p.onrender.com"
const backendLocal="http://localhost:3001"
axios.defaults.baseURL=`${backendRemote}/api`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
