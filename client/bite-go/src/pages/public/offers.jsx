import { HandshakeIcon } from 'lucide-react'
import React from 'react'
import AppStore from '../../store/appStore'   
import OfferCard from '../../components/offer-card';

export default function Offers() {
  const { offers, setDiscount, discount } = AppStore();  
  const addDiscount = (num)=>{
    setDiscount(num);
    console.log(discount);
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <HandshakeIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>offers</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the offer and use it to get lower prices.</p>
            <div className='grid grid-cols-4 gap-14 w-full'>
            {
              offers?.map((item, index)=>( 
                item.isActive ? 
                <OfferCard 
                  onClick={addDiscount} 
                  key={index}  
                  data={item}
                />  
                :
                <></>
              ))
            }
            </div>
      </div>
    </div>
  )
}
