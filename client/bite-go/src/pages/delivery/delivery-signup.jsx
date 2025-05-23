import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';
import AppStore from '../../store/appStore'    
import { signupDelivery } from '../../services/delivery';
import toaster from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Address from '../../components/address-input' 

export default function DeliverySignup() {
  const { pinCodes } = AppStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); 
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [pincode, setPincode] = useState('');
  const [vehicleType, setVehicleType] = useState(''); 
  const [status, setStatus] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const signup = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true) 
      if(!passwordRegex.test(adminPassword)){
        toaster.error("Password is very week");
        return;
      } 
      const response = await signupDelivery(
        { 
          driverName: name,
          phone: phone,
          address: address,
          pincode: pincode, 
          vehicleType: vehicleType,
          email: email,
          password: password
        }
      );
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
      navigate('/login');
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false)
  };
  
  return (
    <div className='container'> 
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
            <form ref={form} className='flex flex-col  items-center w-full' onSubmit={signup}> 
              <div className='flex justify-center w-full'> 
                <div className='flex flex-col items-center justify-center w-6/12'> 
                  <CustomeInput style='w-10/12'  value={name} onChange={(e)=> setName(e.target.value)} name={"driverName"} type={"text"}/>  
                  <CustomeInput style='w-10/12' value={email} onChange={(e)=> setEmail(e.target.value)} name={"email"} type={"email"}/> 
                  <Address name={'address'} style='w-10/12!' onChange={setAddress} />
                  <CustomeInput style='w-10/12' value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value={estimatedTime} onChange={(e)=> setEstimatedTime(e.target.value)} name={"estimated time"} type={"number"}/> 
                </div> 
                <div className='flex flex-col items-center justify-center w-6/12'>
                  <CustomeSelect style='w-10/12' value={vehicleType} onChange={(e)=> setVehicleType(e.target.value)} name={"vehicle type"} data={["Bike", "Car", "Van"]} />
                  <CustomeSelect style='w-10/12' value={status} onChange={(e)=> setStatus(e.target.value)} name={"status"} data={["available", "not available"]} />
                  <CustomeSelect style='w-10/12' value={pincode} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />  
                  <PasswordInput style='w-10/12' value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                  <PasswordInput style='w-10/12' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />  
                </div> 
              </div>
              <div className='w-11/12 mt-4'> 
                <CustomeButton disable={disable} name={"signup"} />
              </div>
            </form>
            <p className='capitalize mt-5!'>already have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/login">login</Link></p>
          </motion.div>
        </div>
  )
}
