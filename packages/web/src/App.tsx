import { useState } from 'react'
import './styles/global.css'
import MyRoutes from './routers'
import { AuthProvider } from './contexts/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MyRoutes/>
    </AuthProvider>
  )
}

export default App
