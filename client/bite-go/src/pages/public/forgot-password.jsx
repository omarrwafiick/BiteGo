import React from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import { Key } from 'lucide-react';
 
export default function ForgotPassword() {
  const forgetPassword = ()=>{

  };
  return ( 
    <div className='flex max-h-screen justify-center items-center flex-col w-full h-dvh bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
      <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}} 
          className='flex justify-center items-center flex-col w-4/12 bg-white rounded-2xl p-16 shadow-xl'>
        <span className='m-2'>
          <Key size={55} color="#FE7531" /> 
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold'>forget password ?</h4>
        <p className='opacity-80 mb-8!'>No worries everything is under control</p>
        <form className='w-full' onSubmit={forgetPassword}>  
          <CustomeButton name={"send me token"} />
        </form>
      </motion.div>
    </div>
  ) 
}
 