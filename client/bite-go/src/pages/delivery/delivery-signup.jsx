import React, { useState } from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';
import AppStore from '../../store/appStore'    

export default function DeliverySignup() {
  const { pinCodes } = AppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [pincode, setPincode] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const signup = ()=>{ 
    try { 
      passwordRegex.test(password); 
    } catch (error) {
      
    }
  };
  return (
    <div className='flex min-h-screen justify-center items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
          <motion.div
              initial={{opacity: 0, y:20}}
              animate={{opacity: 1, y:0}}
              transition={{duration:0.5}} 
              className='flex justify-center items-center flex-col w-8/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-xl'>
            <span className='mb-2'>
              <Truck size={55} color="#FE7531" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold'>welcome to biteGo</h4>
            <p className='opacity-80 mb-8!'>We are so pleased to begin our journey with you.</p>
            <form className='flex flex-col  items-center w-full' onSubmit={signup}> 
              <div className='flex justify-center w-full'> 
                <div className='flex flex-col items-center justify-center w-6/12'> 
                  <CustomeInput style='w-10/12'  value={name} onChange={(e)=> setName(e.target.value)} name={"driverName"} type={"text"}/>  
                  <CustomeInput style='w-10/12' value={email} onChange={(e)=> setEmail(e.target.value)} name={"email"} type={"email"}/> 
                  <CustomeInput style='w-10/12' value={address} onChange={(e)=> setAddress(e.target.value)} name={"address"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value={estimatedTime} onChange={(e)=> setEstimatedTime(e.target.value)} name={"estimated time"} type={"number"}/> 
                  <CustomeSelect style='w-10/12' value={pincode} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />  
                </div> 
                <div className='flex flex-col items-center justify-center w-6/12'>
                  <CustomeSelect style='w-10/12' value={vehicleType} onChange={(e)=> setVehicleType(e.target.value)} name={"vehicle type"} data={["Bike", "Car", "Van"]} />
                  <CustomeSelect style='w-10/12' value={status} onChange={(e)=> setStatus(e.target.value)} name={"status"} data={["available", "not available"]} />
                  <CustomeInput style='w-10/12' value={latitude} onChange={(e)=> setLatitude(e.target.value)} name={"latitude"} type={"number"}/> 
                  <CustomeInput style='w-10/12' value={longitude} onChange={(e)=> setLongitude(e.target.value)} name={"longitude"} type={"number"}/>   
                  <PasswordInput style='w-10/12' value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                  <PasswordInput style='w-10/12' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />  
                </div> 
              </div>
              <div className='w-11/12 mt-4'> 
                <CustomeButton name={"signup"} />
              </div>
            </form>
            <p className='capitalize mt-5!'>already have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/login">login</Link></p>
          </motion.div>
        </div>
  )
}
 