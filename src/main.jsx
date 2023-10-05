import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { postsApi } from './utils/Fetcher.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ApiProvider api={postsApi}>
      <App />
    </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
)
