
import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import VacancyDetail from '../pages/VacancyDetail';
import AppRoutes from './AppRoutes'
import AuthRoutes from './AuthRoutes';

const MyRoutes: React.FC = () => {
  const { signed } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>} />
        <Route path='/vacancies/:id' element={<VacancyDetail/>} />
      </Routes>

      {signed ? <AppRoutes /> : <AuthRoutes/>}
    </BrowserRouter>
  )
}

export default MyRoutes
