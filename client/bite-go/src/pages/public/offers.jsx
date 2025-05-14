import { HandshakeIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AppStore from '../../store/appStore'   
import OfferCard from '../../components/offer-card';
import { getUserOffers } from '../../services/offer';
import CustomeSelect from '../../components/custome-select'

export default function Offers() {
  const [offers, setOffers] = useState([]); 
  const [pincode, setPincode] = useState('');

  const fetchData = async ()=>{
    if(pincode!==''){
      setOffers(await getUserOffers(pincode));
    }
  };
  
  useEffect(()=>{
    fetchData();
  },[]);
  
  const { setDiscount, pinCodes } = AppStore();  
  const addDiscount = (num)=>{
    setDiscount(num); 
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <HandshakeIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>offers</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>Pick the offer and use it to get lower prices by using a pincode.</p>
          <div className='w-full flex '>
              <CustomeSelect style='w-6/12' value={pincode} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />
          </div>
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
