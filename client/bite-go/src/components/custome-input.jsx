import React from 'react'

export default function CustomeInput({name, type, value, onChange, style}) { 
  return (
    <div className={`${style} mb-4`}>
      <label htmlFor={name} className="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{name}</label>
      <input value={value} onChange={onChange} required type={type} id={name} className={`bg-gray-50 border border-none text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531] shadow-xl
             w-full p-2`}/> 
    </div>
  )
} 
 