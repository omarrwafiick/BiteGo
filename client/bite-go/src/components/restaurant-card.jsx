import { Star, User2Icon } from 'lucide-react'
import React from 'react'
import SmallButton from '../components/small-button';

export default function RestaurantCard({name, pinCode, rating, phone, email, address}) {
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl bg-[#FE7531] p-12'>
        <div className='flex justify-center items-center'>
            <span className='rounded-full bg-white'><User2Icon size={55} color='#FE7531' /></span>
        </div>
        <div className='bg-white p-8 rounded-2xl mt-6'>
            <h1 className='mb-2! font-semibold'>Name : <span className='font-medium'>{name}</span></h1>
            <h1 className='mb-2! font-semibold'>PinCode : <span className='font-medium'> {pinCode}</span> </h1> 
            <h1 className='mb-2! font-semibold'>    
                <div className='flex'>
                    Rating :<span className='font-medium flex'>  
                        {
                            [...Array(rating)].map((s)=>(<Star size={20} color='#FE7531' />))
                        }
                    </span>    
                </div>
            </h1>
            <h1 className='mb-2! font-semibold'>Phone : <span className='font-medium'>{phone}</span></h1>
            <h1 className='mb-2! font-semibold'>Email : <span className='font-medium'>{email}</span></h1>
            <h1 className='mb-2! font-semibold'>Address : <span className='font-medium'>{address}</span></h1>
        </div>
        <SmallButton name="View Menus" style={'bg-white rounded-md! w-full text-lg mt-4'} to=""/>
    </div>
  )
}
