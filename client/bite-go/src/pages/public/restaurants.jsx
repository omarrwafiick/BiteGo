import React, { useState } from 'react'
import RestaurantCard from '../../components/restaurant-card'
import { StoreIcon, X } from 'lucide-react'
import AppStore from '../../store/appStore'   
import SmallButton from '../../components/small-button';

export default function Restaurants() {
  const [showDetails, setShowDetails] = useState(false); 
  const [restaurant, setRestaurant] = useState(null); 
  const { restaurants } = AppStore();  
  const showResturant = (restaurantSent)=>{
    setRestaurant(restaurantSent);
    setShowDetails(true);
  }   
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <StoreIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>restaurants</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the restaurant you prefer as you like.</p>
          <div className='grid grid-cols-4 gap-14 w-full'>
            {
              restaurants?.map((item, index)=>( 
                <RestaurantCard 
                  onClick={showResturant} 
                  key={index}  
                  data={item}
                />  
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
                    <img src={restaurant.image} className="w-90 h-90 p-8"/>
                  </div>
                  <div className='flex flex-col justify-evenly items-center w-6/12'>  
                    <h3 className='text-3xl font-semibold mb-3! capitalize'>{restaurant.name}</h3> 
                    <h3 className='mt-2! capitalize text-lg'><a className='font-semibold'>pin code: :</a> {restaurant.pinCode}</h3> 
                    <h3 className='mt-2! capitalize text-lg'><a className='font-semibold'>phone :</a> {restaurant.phone}$</h3> 
                    <h3 className='mt-2! capitalize text-lg'><a className='font-semibold'>email:</a> {restaurant.email}</h3> 
                    <h3 className='mt-2! capitalize text-lg w-10/12 text-center'><a className='font-semibold'>address:</a> {restaurant.address}</h3> 
                    <SmallButton name="View Menus" style={'bg-primary text-white! rounded-md! w-10/12 text-lg mt-4'} to="menus"/>
                  </div>
                </div> 
            </div>
          </div>      
        )}
    </div>
  )
}
