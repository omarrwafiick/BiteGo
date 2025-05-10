import React from 'react'
import ErrorImage from '../../assets/images/error.png'; 
import SmallButton from '../../components/small-button';

export default function NotFound() {
  return (
    <div className='w-full flex flex-col justify-center items-center max-h-screen'>
        <img className='h-96' src={ErrorImage} alt="error image" />
        <div class="text-center">
          <h1 class="text-6xl font-bold text-[#F66A35]">404</h1>
          <p class="text-3xl mt-4! text-[#15A0DC]">Page Not Found</p>
          <p class="mt-2! text-xl mb-6!">The page you're looking for doesn't exist or has been moved.</p>
          <SmallButton name="Home" style={'bg-primary text-xl text-white!'} to=""/>
        </div>
    </div>
  )
}
 