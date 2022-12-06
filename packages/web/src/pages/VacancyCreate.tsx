import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import api from '../services/Api'

interface IVacancyInput {
  title: string
  description: string
  salary: number | string
  workRegime: 'CLT' | 'PJ'
  workLoad: 'FULLTIME' | 'PARTTIME'
  workType: 'IN_PERSION' | 'REMOTE' | 'HYBRID'
  experienceLevel: 'JUNIOR' | 'MID_LEVEL' | 'SENIOR'
}

const VacancyCreate = () => {
  const { handleSubmit, register } = useForm<IVacancyInput>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<IVacancyInput> = async (data) => {
    try {
      data.salary = (data.salary as number).toFixed(2)
      const res = await api.post(`/vacancies`, data);
      navigate(`/vacancies/${res.data.data.id}`)
    } catch (error: any) {
      if(error.response) {
        alert('Não foi possível realizar cadastro, verifique seus dados!');
      }
    }
  }

  return (
    <MainLayout>
      <div>VacancyCreate</div>
      <form className='flex flex-col gap-3 w-96' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-1'>
          <label htmlFor='title'>Título</label>
          <input {...register("title")} />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='description'>Descrição</label>
          <textarea {...register("description")} />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='salary'>Salário</label>
          <input type='number' {...register("salary", {valueAsNumber: true})}/>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='workRegime'>Regime de trabalho</label>
          <select {...register('workRegime')}>
            <option value='CLT'>CLT</option>
            <option value='PJ'>PJ</option>
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='workLoad'>Carga horária</label>
          <select {...register("workLoad")}>
            <option value='FULLTIME'>Integral</option>
            <option value='PARTTIME'>Parcial</option>
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='workType'>Tipo de trabalho</label>
          <select {...register("workType")}>
            <option value='IN_PERSION'>Presencial</option>
            <option value='REMOTE'>Remoto</option>
            <option value='HIBRID'>Híbrido</option>
          </select>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='experienceLevel'>Nível de experiência</label>
          <select {...register("experienceLevel")}>
            <option value='JUNIOR'>Júnior</option>
            <option value='MID_LEVEL'>Pleno</option>
            <option value='SENIOR'>Sênior</option>
          </select>
        </div>
        <button type='submit'>Salvar</button>
      </form>
    </MainLayout>
  )
}

export default VacancyCreate