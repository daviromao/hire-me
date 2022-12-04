import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Vacancy } from '../interfaces/Vacancy.dt'
import MainLayout from '../layout/MainLayout'
import api from '../services/Api'

const VacancyDetail: React.FC = () => {

  const [vacancy, setVacancy] = useState<Vacancy>({
    id: '1',
    title: 'Desenvolvedor Front-end',
    company: 'Empresa X',
    description: 'djasidjasidjkasdioasdkas',
    salary: 5000,
    workRegime: 'CLT',
    workLoad: 'Integral',
    workType: 'Presencial',
    experienceLevel: 'Pleno',
  })

  const {id} = useParams();

  useEffect(() => {
    api.get(`/vacancies/${id}`).then(response => {
      setVacancy(response.data.data)
    }
  )},[])


  return (
    <MainLayout>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <span className='text-lg font-bold'>{vacancy.title}</span>
          <span className='text-xs bg-violet-400 ml-2 rounded p-1 text-white'>{vacancy.experienceLevel}</span>
        </div>
        <span className='text-sm font-medium'>Empresa {vacancy.company}</span>
        <span className='text-sm mt-2'>{vacancy.description}</span>
      </div>
    </MainLayout>
  )
}

export default VacancyDetail