import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <header>
        <div class="container">
          <h2>Web Scraping App</h2>
        </div>
      </header>
      <App />
  </React.StrictMode>,
)
