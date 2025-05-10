import { DollarSign } from 'lucide-react';
import React from 'react'
import CustomeButton from '../../components/custome-button'
export default function Payment() {
  const submit = ()=>{

  };
  return (
    <div className='flex min-h-screen justify-center items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex min-h-60 justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <DollarSign size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>payment</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>You can pay here easily via our platform to facilitate the process and enhance security.</p>
          <form className='w-full flex justify-center' onSubmit={submit}>
              <CustomeButton styles={'w-4/12'} name={"submi"} />
          </form>
        </div>
    </div>
  )
} 