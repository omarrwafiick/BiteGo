import { ListOrderedIcon, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore' 
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import { getVendorOrders, getUserOrders, getDeliveryOrders, updateVendorOrder } from '../../services/order';
import { cancelOrder } from '../../services/main';
import toaster from 'react-hot-toast';

export default function ManageOrders() {
  const [orders, setOrders] = useState(false);
  const [dataDelete, setDataDelete] = useState(false);

  const fetchData = async ()=>{
      if(role === 'user'){
          setOrders(await getUserOrders().data);
      }
      if(role === 'vendor'){
          setOrders(await getVendorOrders().data);
      }
      if(role === 'delivery'){
          setOrders(await getDeliveryOrders().data);
      }
  };

  useEffect(()=>{
   fetchData(); 
  },[orders, dataDelete]);

  const { role } = AppStore(); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [readyTime, setReadyTime] = useState(0); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
    
  const handlePageButtonClick = (dataDeleted) => {
    setDataDelete(dataDeleted);
    setShowConfirm(true);
  };
 
  const handleConfirmResult = async (confirmed) => { 
    try {
      let response = null;
      setShowConfirm(false);
      if (confirmed) {
        response = await cancelOrder(role, dataDelete)
        console.log("User confirmed the action"); 

        if(!response.ok()){
          throw new Error(`Request failed with status ${response.status}`);
        }
        toaster.success("Request was sent successfully");
      }
    } catch (error) {
      toaster.error(`Error : ${error}`);
    } 
  };

  const setOrderData = (data)=>{
    setRemarks(data.remarks);
    setReadyTime(data.readyTime);
    setShowEdit(true);
  }

  const orderEditSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true) 
      const response = await updateVendorOrder(
        {  
          readyTime,
          remarks
        }
      );
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false)
  };

  return (
    <div className='container'> 
        <div className='sub-container'>
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
                                data={orders?.map((order)=>({...order,'user address': order.userId.adress}))}/>
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
                <form ref={form} onSubmit={orderEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-7/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize">edit order</h2> 
                    <CustomeInput value={remarks} onChange={(e) => setRemarks(e.target.value)} name={"remarks"} type={"text"}/> 
                    <CustomeInput value={readyTime} onChange={(e) => setReadyTime(e.target.value)} name={"ready time"} type={"number"}/> 
                    <CustomeButton disable={disable} name={"submit"} />
                </form>
              </div>      
            )} 
    </div>
  )
} 
