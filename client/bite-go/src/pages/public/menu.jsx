import React, { useState } from 'react'

export default function Menu() {
  const [item, setItem] = useState(null);
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Menu size={55} color="#FE7531" /> 
          </span>
          <div className=''>

          </div>
        </div> 
    </div>
  )
}
//pop up item details