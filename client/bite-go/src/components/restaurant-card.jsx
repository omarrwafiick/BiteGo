import React from 'react'
import { Star } from 'lucide-react';
 
export default function RestaurantCard({data, onClick}) {
  return (
    <div onClick={()=>onClick(data)} className='flex flex-col justify-center items-center rounded-2xl bg-gray-200/50 p-4 shadow cursor-pointer'>
        <div className='flex justify-center items-center bg-amber-100/70 rounded-2xl shadow w-full p-4'> 
            <span className='rounded-full p-2'><img src={data.image} className="w-22 h-22 "/></span>
        </div> 
        <div className='bg-white p-4 rounded-2xl mt-3 shadow w-full flex flex-col justify-center items-center'>
            <h1 className='mb-2! font-semibold'>Name : <span className='font-medium'>{data.name}</span></h1>
            <h1 className='mb-2! font-semibold'>    
                <div className='flex'>
                    Rating :<span className='font-medium flex'>  
                        {
                            [...Array(data.rating)].map((s)=>(<Star size={20} color='#FE7531' />))
                        }
                    </span>    
                </div>
            </h1>  
        </div>
    </div>
  )
}
