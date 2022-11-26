import { useState } from 'react'
import './styles/global.css'
import MyRoutes from './routers'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#9a5cf6',
    },
  },
})

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <MyRoutes/>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
