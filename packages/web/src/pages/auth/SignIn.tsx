import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { UserType } from '../../interfaces/User.dt'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../layout/MainLayout'
import { TextField, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import api from '../../services/Api'
import { useAuth } from '../../contexts/AuthContext'

interface IFormInput {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const { type } = useParams()
  const { login } = useAuth()


  const onSubmit = async (data: any) => {
    try {
      if(!type) {return}
      await login(data.email, data.password, type as UserType);
      navigate('/');
    } catch (error: any) {
      console.log(error);
      if(error.response) {
        setError('Não foi possível fazer login. Verifique seu email e senha.');
      }
    }
  }

  useEffect(() => {
    if(type !== 'candidate' && type !== 'company') {
      navigate('/')
    }
  }, [type])
  

  return (
    <MainLayout>
      
      <span className="text-lg mt-5">Acesse sua conta no <strong>Hire Me</strong></span>
      <span className="text-lg mb-5">
        {type === 'candidate' ? 'e candidate-se para vagas!' : 'e encontre os melhores candidatos!'}
      </span>

      <div className='max-w-md min-w-fit w-3/6 py-3 gap-3'>
        <div>
          <form className='flex flex-col gap-3'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  variant='outlined'
                  type='email'
                  size='small'
                />)}
            />
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Senha'
                  variant='outlined'
                  type='password'
                  size='small'
                />)}
            />
            {error && <span className='text-red-500'>{error}</span>}
            <Button variant='contained' onClick={handleSubmit(onSubmit)} color='primary'>Entrar</Button>
          </form>
        </div>
      </div>

    </MainLayout>
  )
}

export default SignIn