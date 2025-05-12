import { Menu, X } from 'lucide-react';
import React, { useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore';
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'

export default function ManageMenu() {
  var { menus } = AppStore(); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const {image, ...rest} = menus[0];
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

  const menuEditSubmit = ()=>{
    //request
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Menu size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>menus</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vendor you can monitor, update and delete menus related to your restaurant.</p>
          <CustomeTable 
            colsNames={Object.keys(rest)}  
            isDelete={true}
            onDelete={handlePageButtonClick}
            isEdit={true}
            onEdit={()=> setShowEdit(true)}
            data={menus.map(({image, ...rest}) => rest)}/>
        </div>
        <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
        {showEdit && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={menuEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize mt-16!">edit menu</h2> 
                      <CustomeInput value="" onChange="" name={"name"} type={"text"}/>  
                      <CustomeInput value="" onChange="" name={"description"} type={"text"}/>  
                      <CustomeInput value="" onChange="" name={"price"} type={"number"}/>  
                      <CustomeSelect style={'text-black!'} value="" onChange="" data={["Fast Food", "Dessert", "Beverage", "Main Course"]} name={"category"} />  
                      <CustomeSelect style={'text-black!'} value="" onChange="" data={["yes", "no"]} name={"available"} />  
                      <CustomeInput value="" onChange="" name={"ready time"} type={"text"}/>  
                      <CustomeButton name={"submit"} />
                </form>
              </div>      
        )} 
    </div>
  )
} 