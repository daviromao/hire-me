import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from '../pages/auth/SignIn'
import SignUp from '../pages/auth/SignUp'


const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/login/:type' element={<SignIn/>} />
      <Route path='/sign-up/' element={<SignUp/>} />
    </Routes>
  )
}

export default AuthRoutes