import React from 'react'
import { Star } from 'lucide-react'; 
 
export default function MenuItem({data, onClick}) { 
  
  return (
    <div onClick={()=> onClick(data)} className='flex flex-col justify-center items-center rounded-2xl p-4 cursor-pointer bg-gray-200/80 shadow w-11/12'>
        <div className='w-full flex justify-center items-center bg-amber-100/70 rounded-2xl mb-2 shadow'>
            <img src={data.image} className="w-36 h-36"/>
        </div>
        <div className='bg-white p-4 rounded-2xl mt-3 shadow w-full flex flex-col justify-center items-center'>
          <h3 className='capitalize text-md font-semibold'>{data.name}</h3> 
          <h3 className='mt-2! capitalize text-md font-semibold'>{data.category} / {data.price}$</h3> 
          <span className='font-medium flex mt-2'>{[...Array(data.rating)].map((s)=>(<Star size={20} color='#FE7531'className='ms-2' />))}</span>
        </div>
    </div>
  ) 
}
