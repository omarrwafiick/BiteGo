import { ListOrderedIcon, X } from 'lucide-react'
import React, { useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore' 
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'

export default function ManageOrders() {
  const { role,  orders} = AppStore(); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [type, setType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [readyTime, setReadyTime] = useState(0);
    
  const handlePageButtonClick = () => {
    setShowConfirm(true);
  };
 
  const handleConfirmResult = (confirmed) => {
    setShowConfirm(false);
    if (confirmed) {
      //send request
      console.log("User confirmed the action"); 
    } else {
      //do nothing
      console.log("User cancelled the action");
    }
  };

  const setOrderData = (data)=>{
    setRemarks(data.remarks);
    setReadyTime(data.readyTime);
    setShowEdit(true);
  }

  const orderEditSubmit = ()=>{
    //request
  }
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
                                colsNames={ Object.keys(orders[0]) } 
                                isDelete={true} 
                                onDelete={handlePageButtonClick}
                                data={orders}/>
                      </> 
                  : 
                  role === "vendor" ?
                      <> 
                        <CustomeTable 
                                colsNames={ Object.keys(orders[0]) }  
                                data={orders}/> 
                      </>
                  :
                  role === "delivery" ?
                      <> 
                        <CustomeTable 
                                colsNames={ Object.keys(orders[0]) } 
                                isDelete={true}
                                onDelete={handlePageButtonClick}
                                data={orders}/>
                      </>
                  :
                      <>   
                        <CustomeTable 
                                colsNames={ Object.keys(orders[0]) } 
                                isDelete={true} 
                                onDelete={handlePageButtonClick}
                                isEdit={true}
                                onEdit={setOrderData} 
                                nameDelete={'cancel'} 
                                data={orders}/>  
                      </>
                }
        </div>
        <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
            {showEdit && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={orderEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-7/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize">edit order</h2> 
                    <CustomeInput value={remarks} onChange={(e) => setRemarks(e.target.value)} name={"remarks"} type={"text"}/> 
                    <CustomeInput value={readyTime} onChange={(e) => setReadyTime(e.target.value)} name={"ready time"} type={"text"}/> 
                    <CustomeButton name={"submit"} />
                </form>
              </div>      
            )} 
    </div>
  )
} 
