import { Users2Icon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CustomeTable from '../../components/custome-table';
import SmallButtonSimple from '../../components/small-button-simple';
import CustomeInput from '../../components/custome-input';
import PasswordInput from '../../components/password-input';
import CustomeButton from '../../components/custome-button';
import ConfirmAction from '../../components/confirm-action';
import toaster from 'react-hot-toast';
import {passwordRegex} from '../../utils/main';
import { addAdmin, deleteEntitiyById, updateUser, approveAccount, getAllEntities } from '../../services/admin';

export default function ManageUsersAndVendors() { 
  const [users, setUsers] = useState([]); 
  const [vendors, setVendors] = useState([]); 
  const [deliveries, setDeliveries] = useState([]);  

  const fetchData = async ()=>{
    setUsers((await getAllEntities('user')).data);
    setVendors(await getAllEntities('vendor').data);
    setDeliveries(await getAllEntities('delivery').data);
  };

  useEffect(()=>{
    fetchData();
  },[users, vendors, deliveries]);

  const [showAdminPopup, setShowAdminPopup] = useState(false); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);  
  const [adminEmail, setAdminEmail] = useState(''); 
  const [adminName, setAdminName] = useState(''); 
  const [adminPassword, setAdminPassword] = useState('');  
  const [userFName, setUserFName] = useState(''); 
  const [userLName, setUserLName] = useState(''); 
  const [userPhone, setUserPhone] = useState(''); 
  const [userAddress, setUserAddress] = useState(''); 
  const [disable, setDisable] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [roleDeleted, setRoleDeleted] = useState('');
  const form = useRef();  

  const submitAddAdmin = async (e)=>{ 
    try {
      e.preventDefault();  
      setDisable(true) 
      if(!passwordRegex.test(adminPassword)){
        toaster.error("Password is very week");
        return;
      } 
      const response = await addAdmin(
        { 
          email: adminEmail, 
          password: adminPassword,  
          name: adminName
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

  const submitEditUser = async (e)=>{ 
    try {
      e.preventDefault();  
      setDisable(true)  
      const response = await updateUser({
          firstName: userFName, 
          lastName: userLName, 
          phone: userPhone,
          address: userAddress
      });
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

  const setData = (data)=>{  
    setShowEditUser(true);
    setUserFName(data.firstName);
    setUserLName(data.lastName);
    setUserPhone(data.phone);
    setUserAddress(data.address);
  };  

  const deleteUser = (user)=>{
    setRoleDeleted('user');
    handlePageButtonClick(user);
  }

  const deleteDelivery = (delivery)=>{
    setRoleDeleted('delivery');
    handlePageButtonClick(delivery);
  }

  const deleteVendor = (vendor)=>{
    setRoleDeleted('vendor');
    handlePageButtonClick(vendor);
  }

  const handlePageButtonClick = (deleteMember) => {
    setDeleteData(deleteMember);
    setShowConfirm(true);
  };

  const handleConfirmResult = async (confirmed) => {
    setShowConfirm(false);
    if (confirmed) {
      try {
      let response = null;
      if(roleDeleted === 'user'){ 
        response = await deleteEntitiyById(deleteData._id, 'user');
      }
      if(roleDeleted === 'vendor'){
        response = await deleteEntitiyById(deleteData._id, 'vendor');
      }
      if(roleDeleted === 'delivery'){
        response = await deleteEntitiyById(deleteData._id, 'delivery');
      }
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
     } 
    } 
  };

  const approveVendor = async (vendor)=>{ 
    try { 
      const response = await approveAccount(vendor._id, 'vendor');
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
     } 
  }; 

  const approveDelivery = async (delivery)=>{ 
    try {
      const response = await approveAccount(vendor._id, 'delivery');
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
     } 
  }; 

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

      <div className='w-full mb-4'>
          <h1 className='capitalize font-bold text-2xl'>vendors</h1>
      </div>

      <CustomeTable 
            colsNames={ Object.keys(vendors[0]) } 
            isDelete={true}
            onDelete={deleteVendor}
            isEdit={true}
            onEdit={approveVendor}
            nameEdit={'approve'} 
            data={vendors}/>

      <div className='w-full mb-4'>
          <h1 className='capitalize font-bold text-2xl'>deliveries</h1>
      </div>

      <CustomeTable 
            colsNames={ Object.keys(deliveries[0]) } 
            isDelete={true}
            onDelete={deleteDelivery}
            isEdit={true}
            onEdit={approveDelivery}
            nameEdit={'approve'} 
            data={deliveries}/>

      <div className='w-full mt-10 mb-4'>
          <h1 className='capitalize font-bold text-2xl'>users</h1>
      </div>

      <CustomeTable 
            colsNames={ Object.keys(users[0]) } 
            isDelete={true} 
            onDelete={deleteUser}
            isEdit={true}
            onEdit={setData} 
            data={users}/> 
    </div>

    {showAdminPopup && (
      <div onClick={() => setShowAdminPopup(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
        <form ref={form} onSubmit={submitAddAdmin} onClick={(e) => e.stopPropagation()} className='relative bg-white h-8/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly  w-6/12'>
            <X size={55} color="#FF0000" onClick={() => setShowAdminPopup(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
            <h2 className="text-2xl font-bold mb-6! capitalize">add new admin</h2> 
            <CustomeInput value={adminName} onChange={(e) => setAdminName(e.target.value)} name={"fullname"} type={"text"}/>
            <CustomeInput value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} name={"email"} type={"email"}/> 
            <PasswordInput value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} name={"password"} />
            <CustomeButton name={"submit"} />
        </form>
      </div>      
    )}
    {showEditUser && (
       <div onClick={() => setShowEditUser(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
          <form ref={form} onSubmit={submitEditUser} onClick={(e) => e.stopPropagation()} className='relative bg-white h-9/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
              <X size={55} color="#FF0000" onClick={() => setShowEditUser(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
              <h2 className="text-2xl font-bold mb-6! mt-2! capitalize">edit user</h2> 
              <CustomeInput value={userFName} onChange={(e) => setUserFName(e.target.value)} name={"first name"} type={"text"}/> 
              <CustomeInput value={userLName} onChange={(e) => setUserLName(e.target.value)} name={"last name"} type={"text"}/> 
              <CustomeInput value={userPhone} onChange={(e) => setUserPhone(e.target.value)} name={"phone number"} type={"text"}/> 
              <CustomeInput value={userAddress} onChange={(e) => setUserAddress(e.target.value)} name={"address"} type={"text"}/> 
              <CustomeButton disable={disable} name={"submit"} />
          </form>
        </div>            
    )} 
    <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
</div>
  )
}
