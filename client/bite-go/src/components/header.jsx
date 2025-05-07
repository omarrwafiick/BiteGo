import React, { useState } from 'react'
import logo from '../assets/images/logo.png';  
import SmallButton from './small-button';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
 
export default function Header() {
  const [activeIndex, setActiveIndex] = useState(null);   
  const handleClick = (index) => {
    setActiveIndex(index);  
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
              <ShoppingBag className='me-3' size={25} color="#FE7531" />
              <SmallButton state={true} style={'bg-white text-black! me-3! text-sm'} to="login" name={"Log In"} />
              <SmallButton state={false} style={'bg-primary text-white! text-sm'} to="signup" name={"Sign Up"} />
            </div>  
        </nav>
    </header>
  )
}
