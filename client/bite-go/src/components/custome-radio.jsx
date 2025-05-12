import React from 'react'

export default function CustomRadio({role, onChange}) {
  return (
    <div class="flex items-center me-6">
        <input 
            id="default-radio-1" 
            type="radio" 
            name="default-radio1" 
            value={role}
            onChange={onChange}
            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-2" />
        <label htmlFor="default-radio-1" className="ms-2 text-md font-medium text-black-gray-900 dark:text-gray-300 capitalize">{role}</label>
    </div>
  )
}
