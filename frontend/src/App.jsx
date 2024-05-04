import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  const Logout = () => {
    localStorage.clear()
    return <Navigate to={'/login'} />
  }

  const RegisterAndLogout = () => {
    localStorage.clear()
    return <Register />
  }

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/' 
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          } />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<RegisterAndLogout />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
