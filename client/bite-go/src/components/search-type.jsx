import React from 'react'
import SmallButton from '../components/small-button';

export default function SearchType({type, icon, element}) {
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl bg-[#FE7531] pt-12 pb-12 ps-4 pe-4'>
        <span className='rounded-full bg-white p-2'>{icon}</span>
        <h1 className='mb-2! w-full font-semibold text-white mt-4! text-xl'>Search by : {type}</h1>
        {element}
        <SmallButton name="Search" style={'bg-white rounded-md! w-full text-lg mt-4'} to=""/>
    </div>
  )
}
