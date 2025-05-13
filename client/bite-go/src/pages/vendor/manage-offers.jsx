import { Ticket, X } from 'lucide-react';
import React, { useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore';
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'

export default function ManageOffers() {
  var { offers } = AppStore(); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [discount, setDiscount] = useState('');
  const [validTo, setValidTo] = useState(Date.UTC);
  const [isActive, setIsActive] = useState(false); 

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

  const offerEdit = (data)=>{
    setDiscount(data.discount);
    setIsActive(data.isActive);
    setValidTo(data.validTo);
    setShowEdit(true);
  }

  const offerEditSubmit = ()=>{
    //request
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Ticket size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>offers</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vandor you can manage offers of your restaurant, you can monitor, update and delete the offer.</p>
          <CustomeTable 
            colsNames={ Object.keys(offers[0]) } 
            isDelete={true}
            onDelete={handlePageButtonClick}
            isEdit={true}
            onEdit={offerEdit}
            data={offers}/> 
        </div> 
        <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
         {showEdit && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={offerEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-8/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize">edit order</h2> 
                    <CustomeInput value={discount} onChange={(e)=> setDiscount(e.target.value)} name={"discountPercentage"} type={"text"}/> 
                    <CustomeInput value={validTo} onChange={(e)=> setValidTo(e.target.value)} name={"validTo"} type={"date"}/> 
                    <CustomeSelect value={isActive} onChange={(e)=> setIsActive(e.target.value)} data={['yes', 'no']} name={"isActive"} />  
                    <CustomeButton name={"submit"} />
                </form>
              </div>      
          )} 
    </div>
  )
} 
