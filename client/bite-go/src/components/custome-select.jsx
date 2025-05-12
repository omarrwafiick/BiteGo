import React from 'react'
  
export default function CustomeSelect({name, data, value, onChange, style, titleStyle}) {
  return (
    <div className={`${style} mb-4`}>
       <label htmlFor="custome-select" className={`block mb-2 text-sm capitalize font-medium text-black ${titleStyle}`}>{name}</label>
        <select value={value} onChange={onChange} required id="custome-select" className="bg-gray-50 text-black text-sm rounded-lg 
             focus:outline-none focus:ring-2 focus:ring-[#FE7531] focus:border-[#FE7531]
             block w-full p-2 shadow-sm border-2 border-black/10">
            {data?.map((item, index) => (
                <option key={item} value={item}>
                    <p className='capitalize!'>{item}</p>
                </option>
            ))}
        </select>
    </div>
  )
}
