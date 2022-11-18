
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import AppRoutes from './AppRoutes'

const MyRoutes: React.FC = () => {
  // const { signed } = useAuth()
  const signed = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
      </Routes>

      {signed ? <AppRoutes /> : ''}
    </BrowserRouter>
  )
}

export default MyRoutes
