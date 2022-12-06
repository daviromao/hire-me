import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../../interfaces/User.dt';
import MainLayout from '../../layout/MainLayout'
import {
  ToggleButtonGroup,
  TextField,
  ToggleButton,
  Button
} from "@mui/material";
import api from '../../services/Api';

interface IFormInput {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}


const SignUp:React.FC = () => {
  const [userType, setUserType] = useState<UserType>('company');
  const { control, handleSubmit, getValues, formState: { errors } } = useForm<IFormInput>()
  const navigate = useNavigate()
  
  const onSubmit = async (data: any) => {
    const _userType = userType === 'company' ? 'companies' : 'candidates'
    delete data.passwordConfirmation

    try {
      const res = await api.post(`/${_userType}`, data);

      navigate(`/login/${userType}`);
    } catch (error: any) {
      if(error.response) {
        alert('Não foi possível realizar cadastro, verifique seus dados!');
      }
    }
  }


  return (
    <MainLayout>
      <span className="text-lg my-5">Crie sua conta no <strong>Hire Me</strong></span>

      <div className='max-w-md min-w-fit w-3/6 py-3 gap-3'>
        <div className='flex items-center justify-between'>
          <span className='font-medium'>Eu sou um(a): </span>
          <ToggleButtonGroup
            color="primary"
            value={userType}
            exclusive
            onChange={(event, value) => {if(value !== null) setUserType(value)}}
            aria-label="Platform"
          >
            <ToggleButton value="company">Empresa</ToggleButton>
            <ToggleButton value="candidate">Candidato</ToggleButton>
          </ToggleButtonGroup>
        </div>


        <form className='mt-10 flex flex-col gap-4'>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField {...field} error={!!errors.name} label="Nome"variant="outlined" helperText={errors.password?.message}/>}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true, pattern: /^\S+@\S+.\S$/i }}
            render={({ field }) => <TextField {...field} type="email" error={!!errors.email} label="Email"variant="outlined" placeholder='example@example.com' helperText={errors.password?.message}/>}
          />

          <div className='flex gap-4'>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <TextField {...field} type="password" error={!!errors.password} label="Senha"variant="outlined" helperText={errors.password?.message}/>}
            />

            <Controller
              name="passwordConfirmation"
              control={control}
              rules={{ validate: (value) => value === getValues('password'), required: true }}
              render={({ field }) => <TextField {...field} type="password" error={!!errors.passwordConfirmation} label="Confirmar"variant="outlined" helperText={errors.password?.message}/>}
            />
          </div>
          <Button color="primary" onClick={handleSubmit(onSubmit)} type="submit" variant="contained">Submit</Button>
        </form>
      </div>


    </MainLayout>
  )
}

export default SignUp