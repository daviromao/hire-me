import { Card, CardContent } from '@mui/material'
import React from 'react'
import { capitalize } from '../helpers/str'

interface VacancyCardProps {
  title: string
  description: string
  salary: number
  company: string
  workRegime: string
  workLoad: string
  workType: string
  experienceLevel: string
}

const VacancyCard: React.FC<VacancyCardProps> = ({
  title,
  description,
  salary,
  company,
  workRegime,
  workLoad,
  workType,
  experienceLevel,
}) => {
  return (
    <Card className='w-full mb-6'>
      <CardContent>
      <div className='flex flex-col justify-between p-4'>
        <div className='flex flex-col gap-3 justify-between'>
          <div className='flex flex-col gap-1'>
            <div>
              <span className='text-lg font-bold'>{title}</span>
              <span className='text-xs bg-violet-400 ml-2 rounded p-1 text-white'>{capitalize(experienceLevel)}</span>
            </div>
            <span className='text-sm font-medium'>Empresa {company}</span>
            <span className='text-sm mt-2'>{description.slice(0, 150)}...</span>
          </div>
          
        </div>
        <div className='flex gap-1 justify-between'>
          <div className='flex flex-col shrink-0 gap-3 justify-between'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>Local</span>
              <span className='text-lg font-bold'>{capitalize(workType)}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>Tipo de vaga</span>
              <span className='text-lg font-bold'>{workRegime}</span>
            </div>
          </div>
          <div className='flex flex-col shrink-0 gap-3 justify-between'>
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>Horário</span>
              <span className='text-lg font-bold'>{capitalize(workLoad)}</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-sm'>Salário</span>
              <span className='text-lg font-bold'>{
                salary ? salary.toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                ) : 'A combinar'
              }</span>
            </div>
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  )
}

export default VacancyCard