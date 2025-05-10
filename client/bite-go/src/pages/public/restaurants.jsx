import React from 'react'
import RestaurantCard from '../../components/restaurant-card'
import { StoreIcon } from 'lucide-react'

export default function Restaurants() {
  return (
    <div className='flex max-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <StoreIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>restaurants</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the restaurant you prefer as you like.</p>
          <div className='grid grid-cols-2 gap-8'>
            <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
             <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
             <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
             <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
             <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
             <RestaurantCard 
              name={'mcdonald\'s'}
              pinCode={'23522'}
              phone={'+0221600377'}
              rating={5}
              email={'mcdonald@gmail.com'}
              address={'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
             />
          </div>
        </div>
    </div>
  )
}
