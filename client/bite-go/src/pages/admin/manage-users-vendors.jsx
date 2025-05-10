import { Users2Icon, X } from 'lucide-react'
import React, { useState } from 'react'
import CustomeTable from '../../components/custome-table'
import SmallButtonSimple from '../../components/small-button-simple'
import CustomeInput from '../../components/custome-input';
import PasswordInput from '../../components/password-input' 
import CustomeButton from '../../components/custome-button'

export default function ManageUsersAndVendors() {
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const submit = ()=>{

  };
  const data = [
    {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
    {_id: '122',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
    {_id: '123',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'}
  ];
  return (
    <div className='flex min-h-scree justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
    <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
      <span className='m-2'>
        <Users2Icon size={55} color="#FE7531" /> 
      </span>
      <h4 className='capitalize mb-2! text-4xl font-bold'>users</h4>
      <p className='opacity-80 mt-2! text-center text-md'>As an admin you can manage users and vendors by deletin there accounts or approve new vendors.</p>

      <div className='w-full flex justify-end items-center mt-4'>
        <SmallButtonSimple onClick={()=>setShowAdminPopup(true)} name="add admin" style={'bg-primary rounded-lg! text-white! capitalize'} /> 
      </div>

      <div className='w-full mt-4 mb-4'>
          <h1 className='capitalize font-bold text-2xl'>vendors</h1>
      </div>

      <CustomeTable 
            colsNames={ Object.keys(data[0]) } 
            isDelete={true} 
            data={data}/>

      <div className='w-full mt-10 mb-4'>
          <h1 className='capitalize font-bold text-2xl'>users</h1>
      </div>
      <CustomeTable 
            colsNames={ Object.keys(data[0]) } 
            isDelete={true} 
            isEdit={true}
            data={data}/> 
    </div>
    {showAdminPopup && (
      <div onClick={() => setShowAdminPopup(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-9/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly  w-6/12'>
            <X size={55} color="#FF0000" onClick={() => setShowAdminPopup(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
            <h2 className="text-2xl font-bold mb-6! capitalize">add new admin</h2> 
            <CustomeInput value="" onChange="" name={"fullname"} type={"text"}/>
            <CustomeInput value="" onChange="" name={"email"} type={"email"}/> 
            <PasswordInput value="" onChange="" name={"password"} />
            <CustomeButton name={"submit"} />
        </form>
      </div>      
    )}
</div>
  )
}
