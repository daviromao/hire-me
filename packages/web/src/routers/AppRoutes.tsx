import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from '../pages/Profile'
import Vacancy from '../pages/VacancyDetail'


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/profile/' element={<Profile/>} />
      <Route path='/vacancies/:id' element={<Vacancy/>} />
    </Routes>
  )
}

export default AppRoutes