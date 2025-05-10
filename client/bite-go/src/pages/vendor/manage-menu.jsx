import { Menu } from 'lucide-react';
import React from 'react'
import CustomeTable from '../../components/custome-table'

export default function ManageMenu() {
  const data = [
              {_id: '121',name: '$2121', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:"4" },
              {_id: '121',name: '$2121', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:"4" },
              {_id: '121',name: '$2121', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:"4" },
            ];
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Menu size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>menus</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vendor you can monitor, update and delete menus related to your restaurant.</p>
          <CustomeTable 
            colsNames={ Object.keys(data[0]) }  
            data={data}/>
        </div>
    </div>
  )
} 