import { Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react' 
import toaster from 'react-hot-toast';
import { createOrder } from '../../services/order';
import AppStore from '../../store/appStore';

export default function Order() {
  var { offerId, vendorId, orderDetails, user, transactionId } = AppStore();
  const [percent, setPercent] = useState(0);
  const [endProgress, setEndProgress] = useState(false);
  const [textFade, setTextFade] = useState('opacity-100');
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
 
  const transactionRequest = async () => {
    try { 
        setPercent(0);
        setTextFade('opacity-100');

        await delay(1000);
        setPercent(10);

        await delay(1000);
        setTextFade('opacity-0');  
        await delay(300);
        setPercent(30);

        await delay(500);
        setTextFade('opacity-100');  
        setPercent(45);

        await delay(700);
        setTextFade('opacity-0');
        await delay(300);
        setPercent(60);

        await delay(500);
        setTextFade('opacity-100');
        setPercent(80);

        await delay(600);
        setTextFade('opacity-0');
        await delay(300);
        setPercent(90);  

        const orderResult = await createOrder({
            userId: user._id, 
            vendorId,  
            remarks: orderDetails.remarks,  
            appliedOffers: offerId.length > 0,   
            transactionId: transactionId, 
            readyTime: orderDetails.readyTime, 
            status: orderDetails.status
        });

        if(orderResult.ok()){
            setEndProgress(true);
        }

        if(endProgress){ 
            setTextFade('opacity-100');
            setPercent(100);
            toaster.success("Request was sent successfully");
        }
    } catch (error) {
        toaster.error(`Error : ${error}`);
    }
  }; 
  
  useEffect(()=>{
    transactionRequest(); 
  },[])

  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex flex-col justify-center items-center w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Clock size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-10! mt-2! text-3xl font-bold'>order fulfillment</h4>
    
      <div className="w-6/12 bg-gray-200 h-6 rounded-full overflow-hidden">
        <div
          className="bg-orange-500 h-full transition-all duration-1000"
          style={{ width: `${percent}%` }}
        />
      </div>
 
      <div
        className={`text-center text-lg text-gray-700 transition-opacity duration-300 ease-in-out mt-8 ${textFade}`}
      >
        Processing Order...
      </div>
    </div>
    </div>
  );
}