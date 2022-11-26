import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import MainLayout from '../layout/MainLayout'
import VacancyCard from '../components/VacancyCard'
import api from '../services/Api'

const Home: React.FC = () => {

  const [vacancies, setVacancies] = useState<any[]>([])

  useEffect(() => {
    api.get('/vacancies').then(response => {
      setVacancies(response.data.data)
    })
  }, [])

  return (
    <MainLayout>
        <>
        <div className='pb-5 gap-3 flex flex-col items-center'>
          <span className='text-2xl font-bold'>Encontre a vaga dos seus sonhos!</span>
          <span className='text-xl font-medium'>Acesse agora os anúncios dos nosso parceiros.</span>
        </div>
        <div className="flex w-full justify-center gap-24 bg-[#faf9f8] pt-11 ">
          <div className='flex flex-col gap-4 rounded bg-white p-8 h-fit'>
            <div className='flex flex-col gap-2'>
              <span className='text-lg font-bold'>Filtros</span>
              <span className='text-sm'>Filtre as vagas por:</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Local</span>
              <select className='border border-gray-300 rounded p-2'>
                <option value=''>Selecione</option>
                <option value=''>Remoto</option>
                <option value=''>Presencial</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Tipo de vaga</span>
              <select className='border border-gray-300 rounded p-2'>
                <option value=''>Selecione</option>
                <option value=''>CLT</option>
                <option value=''>PJ</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Horário</span>
              <select className='border border-gray-300 rounded p-2'>
                <option value=''>Selecione</option>
                <option value=''>Integral</option>
                <option value=''>Parcial</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Salário</span>
              <select className='border border-gray-300 rounded p-2'>
                <option value=''>Selecione</option>
                <option value=''>Até R$ 1.000,00</option>
                <option value=''>De R$ 1.000,00 a R$ 3.000,00</option>
                <option value=''>De R$ 3.000,00 a R$ 5.000,00</option>
                <option value=''>De R$ 5.000,00 a R$ 10.000,00</option>
                <option value=''>Acima de R$ 10.000,00</option>
              </select>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>Nível de experiência</span>
              <select className='border border-gray-300 rounded p-2'>
                <option value=''>Selecione</option>
                <option value=''>Júnior</option>
                <option value=''>Pleno</option>
                <option value=''>Sênior</option>
              </select>
            </div>
          </div>
        <div className='w-1/2 min-w-[500px] max-w-3xl'>
          {
            vacancies.map(vacancy => (
              <VacancyCard
                key={vacancy.id}
                title={vacancy.title}
                description={vacancy.description}
                salary={Number(vacancy.salary)}
                company={vacancy.company.name}
                workRegime={vacancy.workRegime}
                workLoad={vacancy.workLoad}
                workType={vacancy.workType}
                experienceLevel={vacancy.experienceLevel}
              />
            ))
          }
        </div>
      </div>
      </>
    </MainLayout>
  )
}

export default Home