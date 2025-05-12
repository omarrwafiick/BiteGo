import React from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import CustomeSelect from '../../components/custome-select';
import {passwordRegex} from '../../utils/main';
import AppStore from '../../store/appStore'  

export default function Login() {
  const { setToken } = AppStore();
  const login = ()=>{
    try {  
      passwordRegex.test();
    } catch (error) {
      
    }
  }; 
  return (
    <div className='flex max-h-screen justify-center items-center flex-col w-full h-dvh bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
      <motion.div
          initial={{opacity: 0, y:20}}
          animate={{opacity: 1, y:0}}
          transition={{duration:0.5}} 
          className='flex justify-center items-center flex-col w-4/12 bg-white rounded-2xl p-16 shadow-xl'>
        <span className='mb-2'>
          <Home size={55} color="#FE7531" /> 
        </span>
        <h4 className='capitalize mb-2! text-3xl font-bold'>welcome back!</h4>
        <p className='opacity-80 mb-8!'>We are so happy to have you back</p>
        <form className='w-full' onSubmit={login}> 
          <CustomeInput  value="" onChange="" name={"email"} type={"email"}/> 
          <PasswordInput value="" onChange="" name={"password"} />
          <div className='w-full flex pt-2 pb-3'> 
            <CustomeSelect style={'w-full'} data={['user', 'delivery', 'admin','vendor']} name={'role'} /> 
          </div>
          <div className='w-full flex justify-between mb-2 mt-2'> 
            <Link className='capitalize cursor-pointer text-sm' to="/forget-password">forget password?</Link>
          </div>
          <CustomeButton name={"login"} />
        </form>
        <p className='capitalize mt-5!'>don't have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/signup">signup</Link></p>
      </motion.div>
    </div>
  )
}
 