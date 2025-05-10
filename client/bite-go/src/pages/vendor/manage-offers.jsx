import { Ticket } from 'lucide-react';
import React from 'react'
import CustomeTable from '../../components/custome-table'

export default function ManageOffers() {
  const data = [
    {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
    {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
    {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
];
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Ticket size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>offers</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vandor you can manage offers of your restaurant, you can monitor, update and delete the offer.</p>
          <CustomeTable 
            colsNames={ Object.keys(data[0]) } 
            isDelete={true} 
            isEdit={true} 
            data={data}/>
        </div>
    </div>
  )
} 
