import React from 'react'

export default function CustomeTextarea({name, placeHolder, rowNum, value, onChange}) {
  return (
    <div className='w-full'> 
        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">{name}</label>
        <textarea value={value} onChange={onChange} required id="message" rows={rowNum} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531]
             block w-full p-2 mb-4" placeholder={placeHolder}></textarea>
    </div>
  )
}
