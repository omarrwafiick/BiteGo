import React from 'react'
import SmallButton from '../components/small-button';
import ImageRest from '../assets/images/mac-logo.png'; 

export default function OfferCard({data, onClick}) {
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl bg-gray-200/50 p-4 shadow cursor-pointer'>
        <div className='flex justify-center items-center bg-amber-100/70 rounded-2xl shadow w-full p-4'> 
            <span className='rounded-full p-2'><img src={ImageRest} className="w-22 h-22 "/></span>
        </div> 
        <div className='bg-white p-4 rounded-2xl mt-3 shadow w-full flex flex-col justify-center items-center'>
            <h1 className='mb-2! font-semibold capitalize text-md'>discount : <span className='font-medium'>{data.discountPercentage}%</span></h1>
            <h1 className='mb-2! font-semibold capitalize text-md'>pinCode : <span className='font-medium'>{data.pinCode}</span></h1>
            <h1 className='mb-2! font-semibold capitalize text-md'>valid from : <span className='font-medium text-sm'>{data.validFrom}</span></h1>
            <h1 className='mb-2! font-semibold capitalize text-md'>valid to : <span className='font-medium text-sm'>{data.validTo}</span></h1>
        </div>
        {/* make meus has offer only to that vendor by id */}
        <SmallButton onClick={onClick} name="get offer" style={'bg-primary text-white! rounded-md! w-10/12 text-lg mt-4'} to="menus"/>
    </div>
  )
}
