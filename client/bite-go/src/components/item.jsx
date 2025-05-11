import { Minus, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function Item({id, image, name, price, quantity: initialQty, onQuantityChange  }) {
  const [quantity, setQuantity] = useState(initialQty); 
  useEffect(() => {
    onQuantityChange(id, quantity);
  }, [quantity]); 

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity === 0 ? setQuantity(0) : setQuantity(quantity - 1);
  return (
           <tr className="bg-white border-b border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        <div className='flex justify-start items-center'> 
                          {image}
                          <span className='flex flex-col ms-4!'>
                            <a className='capitalize text-lg opacity-75'>name :</a>
                            <a className='capitalize font-bold mt-2! text-xl'>{name}</a>
                          </span>
                        </div>
                      </th>
                      <td className="px-6 py-4 capitalize">
                          {price}
                      </td>
                      <td class="px-6 py-4 capitalize">
                        <div className='flex w-full'> 
                          <Minus onClick={decrease} className='border-2 rounded-sm cursor-pointer' />
                          <a className='ms-2 me-2'>{quantity}</a>
                          <Plus onClick={increase} className='border-2 rounded-sm cursor-pointer' />
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">
                          ${quantity*price}
                      </td>
                  </tr> 
  )
}
