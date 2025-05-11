import { Scroll } from 'lucide-react';
import React, { useState } from 'react'
import AppStore from '../../store/appStore';
import MenuItem from '../../components/menu-item';

export default function Menus() {  
  var { menus } = AppStore();   
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex flex-col justify-center items-center w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Scroll size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>menus</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the menu item as you wish and add it to your cart.</p>
          <div className='grid grid-cols-4 gap-8 w-full'>
            {
              menus?.map((item, index)=>( 
                <MenuItem key={index} data={item} />
              ))
            }
          </div> 
        </div>  
    </div> 
  )
} 