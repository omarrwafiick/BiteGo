import React from 'react'
import SmallButton from '../components/small-button';
import CustomeInput from '../components/custome-input' 

export default function SearchType({type, icon, element, inputs, value, onChange, onClick}) {
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl bg-[#FE7531] pt-12 pb-12 ps-4 pe-4 shadow!'>
        <span className='rounded-full bg-white p-2'>{icon}</span>
        <h1 className='mb-2! w-full font-semibold text-white mt-4! text-xl text-center'>Search by : {type}</h1>
        {element}
        {
          inputs ?         
          <CustomeInput style='w-10/12' value={value} onChange={onChange} name={""} type={"text"}/>  
          :
          <></>
        }
        <SmallButton onClick={onClick} name="Search" style={'bg-white rounded-md! w-10/12 text-lg mt-4'}/>
    </div>
  )
}
