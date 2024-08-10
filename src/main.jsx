import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MyContextProvider from './context/Context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
      <MyContextProvider>
        <StrictMode>
        <App />,
        </StrictMode>
      </MyContextProvider>
)