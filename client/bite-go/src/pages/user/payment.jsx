import { DollarSign } from 'lucide-react';
import React, { useState } from 'react' 
import { useNavigate } from 'react-router-dom';
import PaypalPayment from '../../components/paypal';
import AppStore from '../../store/appStore';
import { addTransaction } from '../../services/transaction';

export default function Payment() {
  var { setTransactionId, totalPrice } = AppStore();
  const navigate = useNavigate(); 
  const [paypalPaymentStatus, setPaypalPaymentStatus] = useState(false);
  const [method, setPaypalMethod] = useState('Paypal');
  const paymentMethod = (data)=>{
      if(data.card) setPaypalMethod('Card');
  }

  const orderSubmit = async ()=>{
    if(paypalPaymentStatus){
      const transactionResult = await addTransaction({
          paymentMode: method, 
          offerId,
          vendorId, 
          orderId, 
          totalAmount: totalPrice
      });    
      if(!transactionResult.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setTransactionId(transactionResult.data.transactionId); 
      navigate('/user/order');
    }
  };
  return (
    <div className='container'> 
        <div className='sub-container'>
          <span className='m-2'>
            <DollarSign size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>payment</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>You can pay here easily via our platform to facilitate the process and enhance security.</p>
            <div className='w-6/12'>
              <PaypalPayment
                    paymentMethod={paymentMethod}
                    onClick={() => orderSubmit()}
                    price={totalPrice}
                    onSuccess={()=>setPaypalPaymentStatus(true)}
                    onCancel={()=>setPaypalPaymentStatus(false)}
                    onError={()=>setPaypalPaymentStatus(false)} />
            </div>
        
        </div>
    </div>
  )
} 