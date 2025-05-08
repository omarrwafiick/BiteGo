import React from 'react'
import CustomeTable from '../../components/custome-table'
import { HistoryIcon } from 'lucide-react'

export default function OrderHistory() {
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <HistoryIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>user orders</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As a user you can see your orders and review what you have ordered.</p>
          <CustomeTable  
            data={[
              {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'}
            ]} 
            colsNames={['_id','totalAmount','status','userId','vendorId','deliveryId']} />
        </div>
    </div>
  )
}
 