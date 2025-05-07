import React from 'react'
import SmallButton from '../components/small-button';

export default function Service({image, title, btnStyle}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      {image}
      <h1 className='text-2xl font-semibold mb-4! mt-6!'>{title}</h1>
      <SmallButton name='Order Now →' style={`text-white! p-4! ${btnStyle}`} to="" />
    </div>
  )
}
