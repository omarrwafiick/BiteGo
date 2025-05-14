import React, { useEffect, useRef, useState } from 'react' 
import SmallButtonSimple from '../../components/small-button-simple'
import InfoBox from '../../components/info-box'
import { User, X } from 'lucide-react'
import AppStore from '../../store/appStore'   
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import { getDeliveryProfile, updateDeliveryProfile } from '../../services/delivery';
import { getVendorProfile, updatetVendorProfile } from '../../services/vendor';
import { getUserProfile, updateUserProfile } from '../../services/user';
import toaster from 'react-hot-toast';

export default function Profile() { 
  const [data, setData] = useState(null);
  const form = useRef();  
  const [disable, setDisable] = useState(false);

  const fetchData = async ()=>{
    if(role === "user"){
      setData(await getUserProfile().data);
    }
    if(role === "vendor"){
      setData(await getVendorProfile().data);
    }
    if(role === "delivery"){
      setData(await getDeliveryProfile().data);
    }
  };

  useEffect(()=>{
    fetchData();
  },[data]);

  useEffect(()=>{
    if(showEdit){
      if(role === "user" ){ 
        setName(data.firstName); 
        setLName(data.lastName);
      }
      if(role === "vendor" ){
        setName(data.name); 
        setOName(data.ownerName);
        setStatus(data.status);
      }
      if(role === "delivery" ){
        setName(data.driverName); 
        setEstimatedTime(data.estimatedTime);
        setVehicle(data.vehicleType);
      }
      setPhone(data.phone);
      setAddress(data.address);
      setPincode(data.pincode);
      setLatitude(data.latitude);
      setLongitude(data.longitude);
    }
  },[showEdit]);

  const { role, pinCodes} = AppStore();
  const [showEdit, setShowEdit] = useState(false);  
  //common 
  const [name, setName] = useState('');  
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); 
  const [pincode, setPincode] = useState('');  
  //user
  const [lName, setLName] = useState('');   
  //delivery 
  const [vehicle, setVehicle] = useState('');

  const userEditSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true);
      let response = null;
      if(role === "user"){
        response = await updateUserProfile({
          firstName: name,
          lastName: lName,
          phone: phone,
          address: address
        });
      }
      if(role === "vendor"){
        response = await updatetVendorProfile({
          phone: phone,
          name:name, 
          pinCode:pincode
        });
      }
      if(role === "delivery"){
        response = await updateDeliveryProfile({
          driverName: name, 
          phone: phone,
          address: address, 
          pincode: pincode,
          vehicleType: vehicle 
        });
      } 

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
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
            <div className='w-full flex flex-col justify-start items-center'>
              <span className='m-2'>
                <User size={55} color="#FE7531" /> 
              </span> 
              <h1 className='capitalize mb-8! text-3xl font-bold'>my profile</h1> 
            </div>
            <div className='flex flex-col justify-start items-center w-full p-6 bg-gray-200/80 mt-2 rounded-lg'>
              <div className='w-full flex justify-between items-center border-b-2 border-b-black/10'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>personal information</h1>
                <SmallButtonSimple onClick={() => setShowEdit(true)} name="edit" style={'bg-primary rounded-lg! text-white! capitalize mb-3'} /> 
              </div> 
              
              <div className='w-full grid grid-cols-3 gap-8 mt-6'>
                {
                  role === "user" ?  
                      <>   
                        <InfoBox title={'id'} value={data._id} />
                        <InfoBox title={'first name'} value={data.firstName} />
                        <InfoBox title={'last name'} value={data.lastName} />  
                        <InfoBox title={'email'} value={data.email} />
                        <InfoBox title={'phone number'} value={data.phone} />
                        <InfoBox title={'is verified'} value={data.verified} />
                      </> 
                  : 
                  role === "vendor" ?
                      <> 
                        <InfoBox title={'_id'} value={data._id} />
                        <InfoBox title={'name'} value={data.name} />
                        <InfoBox title={'owner name'} value={data.ownerName} />  
                        <InfoBox title={'email'} value={data.email} />
                        <InfoBox title={'phone number'} value={data.phone} /> 
                        <InfoBox title={'is approved'} value={data.isApproved} />
                      </>
                  :
                  role === "delivery" ?
                      <> 
                        <InfoBox title={'_id'} value={data._id} />
                        <InfoBox title={'driver name'} value={data.driverName} />   
                        <InfoBox title={'email'} value={data.email} />
                        <InfoBox title={'phone number'} value={data.phone} />
                        <InfoBox title={'estimated time'} value={data.estimatedTime} /> 
                        <InfoBox title={'is approved'} value={data.isApproved} />
                      </>
                  :
                      <> 
                        <h1 className='text-lg capitalize font-bold'>*sorry there is nothing to show</h1>
                      </>
                }
              </div>
            </div>
            <div className='flex flex-col justify-start items-center bg-gray-200/80 w-full p-6 mt-6 mb-6 rounded-lg'>
              <div className='border-b-2 border-b-black/10 w-full'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>address</h1> 
              </div>
              <div className='w-full flex justify-start items-center mt-6'>
                {
                  role === "user" || role === "delivery" || role === "vendor" ? 
                  <> 
                    <InfoBox title={'address'} value={data.address} /> 
                  </>
                  :
                  <> 
                    <h1 className='text-lg capitalize font-bold'>sorry there is nothing to show</h1>
                  </>
                }
              </div>
            </div>
        </div>
        {showEdit && role === "user" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form ref={form} onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-20! capitalize">edit profile</h2> 
                    <CustomeInput value={name} onChange={(e)=> setName(e.target.value)} name={"first name"} type={"text"}/> 
                    <CustomeInput value={lName} onChange={(e)=> setLName(e.target.value)} name={"last name"} type={"text"}/> 
                    <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone number"} type={"text"}/>   
                    <CustomeInput value={address} onChange={(e)=> setAddress(e.target.value)} name={"address"} type={"text"}/>   
                    <CustomeButton disable={disable} name={"submit"} />
                </form>
              </div>      
        )}
        {showEdit && role === "vendor" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form ref={form} onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-60! capitalize">edit profile</h2> 
                    <CustomeInput value={name} onChange={(e)=> setName(e.target.value)} name={"name"} type={"text"}/>  
                    <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone number"} type={"text"}/>    
                    <CustomeSelect value={pincode} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />  
                    <CustomeButton disable={disable} name={"submit"} />
                </form> 
              </div>      
        )}
        {showEdit && role === "delivery" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form ref={form} onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-80! capitalize">edit profile</h2> 
                    <CustomeInput value={name} onChange={(e)=> setName(e.target.value)} name={"driver name"} type={"text"}/> 
                    <CustomeSelect value={vehicle} onChange={(e)=> setVehicle(e.target.value)} data={["Bike", "Car", "Van"]} name={"vehicle type"} />  
                    <CustomeInput value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone number"} type={"text"}/>   
                    <CustomeInput value={address} onChange={(e)=> setAddress(e.target.value)} name={"address"} type={"text"}/>                       
                    <CustomeSelect value={pinCodes} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />  
                    <CustomeButton disable={disable} name={"submit"} />
                </form>
              </div>      
        )}
    </div>
  )
}
