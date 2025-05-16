import React from 'react'

export default function CustomeInput({name, type, value, onChange, style, titleStyle, inputStyle, placeholder}) { 
  return (
    <div className={`${style} mb-4`}>
      <label htmlFor={name} className={`block mb-2 text-sm font-medium capitalize text-black ${titleStyle}`}>{name}</label>
      <input placeholder={placeholder} value={value} onChange={onChange} required type={type} id={name} className={`bg-gray-50 text-black text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531] shadow-sm
             w-full p-2 border-2 border-black/10 ${inputStyle}`}/> 
    </div>
  )
}  
 