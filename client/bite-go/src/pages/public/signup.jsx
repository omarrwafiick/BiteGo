import React from 'react'
import { motion } from 'framer-motion';
import SmallButton from '../../components/small-button' 
import { PackagePlusIcon } from 'lucide-react'; 

export default function Signup() {
  return (
    <div className='container justify-center!'> 
      <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}} 
          className='flex justify-center items-center flex-col w-4/12 bg-white rounded-2xl p-16 shadow-xl'>
        <span className='m-2'>
          <PackagePlusIcon size={55} color="#FE7531" /> 
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold'>account type</h4>
        <p className='opacity-80 mb-8! mt-2! text-center text-sm'>According to your choice you will be able to act as the role you pick</p>
        <SmallButton name="User" style={'bg-primary text-white! rounded-lg w-full mb-6 p-3!'} to="user/signup"/>
        <SmallButton name="Vendor" style={'bg-primary text-white! rounded-lg w-full mb-6 p-3!'} to="vendor/signup"/>
        <SmallButton name="Delivery" style={'bg-primary text-white! rounded-lg w-full mb-3 p-3!'} to="delivery/signup"/>
      </motion.div>
    </div>
  )
}