import React, { useState } from 'react'
import logo from '../assets/images/logo.png';  
import SmallButton from './small-button';
import { Link, useNavigate } from 'react-router-dom';
import { CircleUser, ShoppingBag, X } from 'lucide-react';
import AppStore from '../store/appStore';
import SmallButtonSimple from './small-button-simple';
import { div } from 'framer-motion/client';
 
export default function Header() {
  const { cartItems } = AppStore(); 
  const [activeIndex, setActiveIndex] = useState(null);   
  const [showCart, setShowCart] = useState(false);    
  const navigate = useNavigate(); 
  const handleClick = (index) => {
    setActiveIndex(index);  
  }; 
  const navigateToCart = (index) => {
    navigate('/user/cart')  
  }; 
  return (
    <header className='w-full absolute top-0 left-0 z-50 flex justify-center items-center pt-4 pb-4'>   
        <nav className="flex items-center justify-between w-10/12 border-gray-200">
            <Link to="/" className="flex items-center cursor-pointer">
                <img src={logo} className="h-11" alt="bitego logo" /> 
                <h1 className='capitalize text-3xl ms-2! font-semibold'>bite<a className='text-primary'>Go</a></h1>
            </Link> 

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border opacity-80 backdrop-blur-md bg-opacity-50 border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                    <li> 
                        <Link onClick={() => handleClick(0)} to="/#hero" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 0 ? 'text-primary' : 'text-black'}`}  aria-current="page">Home</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(1)} to="/#popular" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 1 ? 'text-primary' : 'text-black'}`}>Popular</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(2)} to="/#about" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 2 ? 'text-primary' : 'text-black'}`}>About</Link>
                    </li>
                    <li>
                        <Link onClick={() => handleClick(3)} to="/#services" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 3 ? 'text-primary' : 'text-black'}`}>Services</Link>
                    </li>
                    <li> 
                        <Link onClick={() => handleClick(4)} to="/#contact" className={`px-4 py-2 rounded-md font-medium ${activeIndex === 4 ? 'text-primary' : 'text-black'}`}>Contact</Link>
                    </li>
                </ul>
            </div>     

            <div className="items-center justify-end hidden w-full md:flex md:w-auto md:order-1 relative" id="navbar-user">
              <div className='relative'>
                <ShoppingBag onClick={()=> setShowCart(true)} className='me-3 cursor-pointer hover:scale-105 duration-100' size={35} color="#000000" />
                {
                    cartItems.length > 0 ? <span className='w-3 h-3 top-0 right-2 bg-orange-500 rounded-full absolute'></span> : <></>
                } 
              </div> 
              <CircleUser onClick={()=> navigate('/profile')} className='me-3 cursor-pointer hover:scale-105 duration-100' size={35} color="#000000" />
              <SmallButton state={true} style={'bg-white text-black! me-3! text-sm'} to="login" name={"Log In"} />
              <SmallButton state={false} style={'bg-primary text-white! text-sm'} to="signup" name={"Sign Up"} />
            </div>  
        </nav>
            {showCart && (
                <div onClick={(e) => e.stopPropagation()} className='absolute right-12 top-16 bg-white h-96 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-3/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowCart(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-xl font-bold mt-16! mb-3! capitalize text-center">recently cart items ({cartItems.length})</h2>   
                    <hr className='mb-2 opacity-15' />
                    {
                        cartItems?.map((item, index)=>(
                            <div className='w-full flex justify-between items-center rounded-lg bg-gray-200/80 mt-3 shadow'>
                                <div className='flex w-3/12'>
                                    <img src={item.image} className="w-20 h-20"/>
                                </div>
                                <div className='flex flex-col justify-start items-center w-9/12 ms-4'>
                                    <h1 className='w-full capitalize font-bold mb-1!'>
                                        {item.name} 
                                    </h1>
                                    <h3 className='w-full'>
                                        {item.quantity} x <a className='font-semibold'>{item.price}$ </a>
                                    </h3>
                                </div>
                            </div>
                        ))
                    }
                    <SmallButtonSimple style={'capitalize bg-primary text-white! rounded-lg mt-3'} onClick={()=>navigateToCart()} name={"check out"} />
                </div> 
            )}
    </header>
  )
}
