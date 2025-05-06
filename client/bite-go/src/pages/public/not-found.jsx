import React from 'react'
import ErrorImage from '../assets/images/error.png'; 

export default function NotFound() {
  return (
    <div className='w-full flex flex-col justify-center items-center h-dvh'>
        <img className='h-96' src={ErrorImage} alt="error image" />
        <div class="text-center">
          <h1 class="text-6xl font-bold text-[#F66A35]">404</h1>
          <p class="text-3xl mt-4! text-[#15A0DC]">Page Not Found</p>
          <p class="mt-2! text-xl">The page you're looking for doesn't exist or has been moved.</p>
        </div>
    </div>
  )
}
