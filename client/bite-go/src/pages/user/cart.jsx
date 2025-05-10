import React from 'react'
import Item from '../../components/item'
import Image from '../../assets/images/item.png'; 

export default function Cart() {
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
           <div className='w-8/12 h-full'>
              <Item name={'burger'} price={17} quantity={2} image={<img src={Image} className="w-full h-full" alt="food image" loading='lazy' />} />
           </div>
           <div className='w-4/12 h-full'>
            
           </div>
        </div> 
    </div> 
  )
}
