import React from 'react'
import SmallButton from '../components/small-button';
export default function Popular({title, description, width, image}) {
  return (
    <div className={`relative h-56 rounded-2xl overflow-hidden ${width}`}>
        {image}
        <div className='absolute top-3 left-3 text-white'>
            <h1 className='text-2xl capitalize'>{title}</h1>
            <p className='mt-2! text-sm capitalize mb-24!'>{description}</p>
            <SmallButton name='Order Now' style={'bg-primary text-white! p-4!'} to="" />
        </div>
    </div>
  )
}
