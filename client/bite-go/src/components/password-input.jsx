import React, { useState } from 'react'
import { EyeClosed, EyeIcon } from 'lucide-react';

export default function PasswordInput({name, value, onChange, style}) { 
  const [passState, setPass] = useState(false);
  return (
    <div className={`${style} mb-4 relative`}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input value={value} onChange={onChange} required type={passState ? 'text' : 'password'} id={name} className="bg-gray-50 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531]
             block w-full p-2 shadow-sm border-2 border-black/10" />
      <span className='absolute right-3 top-9 cursor-pointer' onClick={()=> setPass(!passState)}>
        {
            passState ? <EyeIcon size={24} color="#FE7531" /> : <EyeClosed size={24} color="#FE7531" />  
        }
      </span> 
    </div>
  )
}
