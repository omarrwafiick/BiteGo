import React from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { Truck } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';

export default function DeliverySignup() {
  const signup = ()=>{
    try { 
      passwordRegex.test();
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
                  <CustomeInput style='w-10/12'  value="" onChange="" name={"driverName"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"owner name"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"email"} type={"email"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"pinCode"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"address"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"phone"} type={"text"}/> 
                </div>
                <div className='flex flex-col items-center justify-center w-6/12'>
                  <CustomeSelect style='w-10/12' value="" onChange="" name={"latitude"} data={["Bike", "Car", "Van"]} />
                  <CustomeInput style='w-10/12' value="" onChange="" name={"latitude"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"latitude"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value="" onChange="" name={"longitude"} type={"text"}/>   
                  <PasswordInput style='w-10/12' value="" onChange="" name={"password"} />
                  <PasswordInput style='w-10/12' value="" onChange="" name={"confirm password"} />  
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
 