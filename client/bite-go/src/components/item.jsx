import React from 'react'

export default function Item({image, name, price, quantity}) {
  return (
    <div className='w-full flex justify-center items-start bg-amber-300 p-4'>
      <div className='flex justify-center items-center w-3/12'>
        {image}
      </div>
      <div className='flex flex-col  justify-center items-between w-3/12'>
        <h1 className='='>product</h1>
        <h3 className=''>{name}</h3>
        <h3>{price}</h3>
      </div>
      <div className='flex flex-col w-3/12'>
        <h1>quantity</h1>
        <h3>{quantity}</h3> 
      </div>
      <div className='flex flex-col w-3/12'>
        <h1>total</h1>
        <h3>{price * quantity}</h3> 
      </div>
    </div>
  )
}
