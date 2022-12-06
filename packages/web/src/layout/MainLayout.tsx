import React from 'react'
import Navbar from '../components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const MainLayout: React.FC<LayoutProps> = ({children}) => {
  return (
    <div className='h-screen'>
      <Navbar/>
      <main className='flex flex-col justify-center items-center'>
        {children}
      </main>
    </div>
  )
}

export default MainLayout