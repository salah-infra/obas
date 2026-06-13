import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <App locale="en" /> },
  { path: '/ar', element: <App locale="ar" /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
