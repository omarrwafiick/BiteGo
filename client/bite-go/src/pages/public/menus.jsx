import { Scroll, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import AppStore from '../../store/appStore';
import MenuItem from '../../components/menu-item'; 
import { Minus, Plus } from 'lucide-react';
import CustomeButton from '../../components/custome-button';
import { getFoodItems } from '../../services/fooditems';

export default function Menus() {  
  const [menus, setMenus] = useState([]); 

  const fetchData = async ()=>{
    setMenus(await getFoodItems());
  };
  
  useEffect(()=>{
    fetchData();
  },[]);
  
  const [showDetails, setShowDetails] = useState(false); 
  const [item, setItem] = useState(null); 
  var { addCartItem } = AppStore();   
  const showItem = (itemSent)=>{
    setItem(itemSent);
    setShowDetails(true);
  }    
  var [itemQuantity, setItemQuantity] = useState(0);
  const addToCartItem = (item)=>{
    addCartItem(item);
    setShowDetails(false);
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex flex-col justify-center items-center w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'> 
            <Scroll size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>menus</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the menu item as you wish and add it to your cart.</p>
          <div className='grid grid-cols-4 gap-8 w-full'>
            {
              menus?.map((item, index)=>( 
                <MenuItem onClick={showItem} key={index} data={item} />
              ))
            }
          </div> 
        </div>  
        {showDetails && (
          <div onClick={() => setShowDetails(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
            <div onClick={(e) => e.stopPropagation()} className='relative bg-white h-8/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-center  w-8/12'>
                <X size={55} color="#FF0000" onClick={() => setShowDetails(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                <div className='flex w-full'>
                  <div className='flex justify-center items-center w-6/12 bg-amber-100/70 rounded-2xl shadow'> 
                    <img src={item.image} className="w-90 h-90 "/>
                  </div>
                  <div className='flex flex-col justify-evenly items-center w-6/12'>  
                    <h3 className='text-3xl font-semibold mb-3! capitalize'>{item.name}</h3> 
                    <h3 className='capitalize text-md opacity-80'>description: {item.description}</h3> 
                    <h3 className='mt-2! capitalize text-xl'><a className='font-semibold'>price :</a> {item.price}$</h3> 
                    <h3 className='mt-2! capitalize text-xl'><a className='font-semibold'>available:</a> {item.available}</h3> 
                    <h3 className='mt-2! capitalize text-xl'><a className='font-semibold'>ready time:</a> {item.readyTime}</h3> 
                    <div className='flex w-10/12'>
                      <div className='flex justify-center items-center  w-4/12 h-full'> 
                          <Minus size={35} onClick={()=>itemQuantity === 0 ? setItemQuantity(0): setItemQuantity(itemQuantity--)} className='border-2 border-black/20 rounded-full cursor-cell!' />
                          <a className='ms-2 me-2 font-bold'>{itemQuantity}</a>
                          <Plus size={35} onClick={()=>setItemQuantity(itemQuantity++)} className='border-2 border-black/20 rounded-full cursor-cell!' />
                      </div>
                      <CustomeButton onClick={()=> addToCartItem(item)} styles={'w-8/12 cursor-progress!'} name={"add to cart"} /> 
                    </div>
                  </div>
                </div> 
            </div>
          </div>      
        )}
    </div> 
  )
} 