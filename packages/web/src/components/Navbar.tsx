import { MenuItem, Button, Menu } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import logo from '../assets/logo.png'

const Navbar: React.FC = () => {
  const { signed, logout, user } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl)

  const handleLoginOption = (option: string) => {
    setAnchorEl(null)
    navigate(option)
  }

  return (
    <nav className='h-20 bg-white dropshadow-navbar w-full sticky top-0 flex justify-evenly items-center mb-10 '>
      <div className='flex gap-4'>
        <Link to="/home">
          <img src={logo} alt="logo" className='h-12' />
        </Link>
        <div className='flex-grow' />
        <div className='flex items-center gap-4'>
          {signed && (
            <div className='flex items-center gap-4'>
              <Link to='/profile'>Perfil</Link>
            </div>
         )}
         {
            user?.type === 'COMPANY' && (
              <div className='flex items-center gap-4'>
                <Link to='/vacancy/create'>Criar vaga</Link>
              </div>
            )
         }
        </div>
      </div>
      <div className='flex'>
        {!signed ? (
          <>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="primary"
            >
              <span className='font-medium text-violet-500'>Acessar</span>
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={() => {setAnchorEl(null)}}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
            <MenuItem onClick={() => {handleLoginOption('/login/candidate')}}>Candidato</MenuItem>
            <MenuItem onClick={() => {handleLoginOption('/login/company')}}>Empresa</MenuItem>
            <MenuItem onClick={() => {handleLoginOption('/register')}}>Cadastrar</MenuItem>
          </Menu>
          </>
        ):(
          <Button color="primary" onClick={logout}>Sair</Button>
        )}
      </div>
    </nav>
  )
}

export default Navbar