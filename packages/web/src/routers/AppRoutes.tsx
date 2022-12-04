import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Profile from '../pages/Profile'
import VacancyCreate from '../pages/VacancyCreate'
import VacancyDetail from '../pages/VacancyDetail'


const AppRoutes: React.FC = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path='/profile/' element={<Profile/>} />

      {user?.type === 'COMPANY' && (
        <Route path='/vacancy/create' element={<VacancyCreate/>} />
      )}
    </Routes>
  )
}

export default AppRoutes