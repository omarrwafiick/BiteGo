import { ListOrderedIcon } from 'lucide-react'
import React from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore'  
export default function ManageOrders() {
  //const { role } = AppStore();
  const role = "";
  const data = [
              {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '122',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '123',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '122',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              {_id: '123',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
              
            ];
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <ListOrderedIcon size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-8! text-4xl font-bold'>orders</h4> 
          {
                  role === "user" ?  
                      <>  
                        <CustomeTable 
                                colsNames={ Object.keys(data[0]) } 
                                isDelete={true} 
                                data={data}/>
                      </> 
                  : 
                  role === "vendor" ?
                      <> 
                        <CustomeTable 
                                colsNames={ Object.keys(data[0]) }  
                                data={data}/> 
                      </>
                  :
                  role === "delivery" ?
                      <> 
                        <CustomeTable 
                                colsNames={ Object.keys(data[0]) } 
                                isDelete={true} 
                                data={data}/>
                      </>
                  :
                      <>  
                        <CustomeTable 
                                colsNames={ Object.keys(data[0]) } 
                                isDelete={true} 
                                isEdit={true}
                                data={data}/> 
                      </>
                }
        </div>
    </div>
  )
} 
