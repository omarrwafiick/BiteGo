import React from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button' 
import PasswordInput from '../../components/password-input'  
import { CreditCard } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';

export default function ResetPassword() {
  const reserPassword = ()=>{
    try { 
      passwordRegex.test();
    } catch (error) {
      
    }
  }; 
  return (
    <div className='flex justify-center items-center flex-col w-full h-dvh bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
      <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}} 
          className='flex justify-center items-center flex-col w-4/12 bg-white rounded-2xl p-16 shadow-xl'>
        <span className='mb-2'>
          <CreditCard size={55} color="#FE7531" /> 
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold'>reset password</h4>
        <p className='opacity-80 mb-8!'>Be sure to remember it back</p>
        <form className='w-full' onSubmit={reserPassword}>  
          <PasswordInput value="" onChange="" name={"password"} />
          <PasswordInput value="" onChange="" name={"confirm password"} />  
          <CustomeButton name={"reset"} />
        </form> 
      </motion.div>
    </div>
  )
}