import React, { useEffect, useState } from 'react'
import CustomeButton from '../components/custome-button';
import { Star } from 'lucide-react'; 
import Image from '../assets/images/item.png'; 
import { Minus, Plus } from 'lucide-react';
import AppStore from '../store/appStore';

export default function MenuItem({data}) { 
  var { addCartItem, cartItems } = AppStore();    
  var [itemQuantity, setItemQuantity] = useState(0);
  useEffect(()=>{
    console.log(cartItems)
  },[cartItems])
  return (
    <div className='flex flex-col justify-center items-center rounded-2xl p-4 bg-gray-200 shadow w-11/12'>
        <div className='w-full flex justify-center items-center bg-amber-50 rounded-2xl mb-2 shadow'>
            <img src={data.image} className="w-36 h-36"/>
        </div>
        <h3 className='mt-2! capitalize text-md font-semibold'>{data.name}</h3> 
        <h3 className='mt-2! capitalize text-md font-semibold'>{data.category} / {data.price}$</h3> 
        <span className='font-medium flex mt-2'>{[...Array(data.rating)].map((s)=>(<Star size={20} color='#FE7531'className='ms-2' />))}</span>
        <span className='mt-4'>
            <div className='flex justify-center w-full'> 
                <Minus onClick={()=>itemQuantity === 0 ? setItemQuantity(0): setItemQuantity(itemQuantity--)} className='border-2 rounded-sm cursor-pointer' />
                <a className='ms-2 me-2'>{itemQuantity}</a>
               <Plus onClick={()=>setItemQuantity(itemQuantity++)} className='border-2 rounded-sm cursor-pointer' />
            </div>
        </span>
        <CustomeButton onClick={()=> addCartItem({ id:'1', name:"burger king", price:77, quantity:itemQuantity, image: Image })} styles={'w-full'} name={"add to cart"} /> 
    </div>
  )
}
