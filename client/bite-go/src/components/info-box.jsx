import React from 'react'

export default function InfoBox({title, value}) {
  return (
    <div className='flex flex-col justify-center items-start'>
        <h1 className='capitalize text-lg'>{title}</h1>
        <h3 className='font-bold capitalize text-lg mt-1!'>{value}</h3>
    </div>
  )
}
