import React, { useState } from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button' 
import PasswordInput from '../../components/password-input'  
import { CreditCard } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';
import { resetPassword } from '../../services/auth';
import toaster from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate(); 
  
  const resetPasswordSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true) 
      if(!passwordRegex.test(password)){
        toaster.error("Password is very week");
        return;
      } 
      const location = useLocation();
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const response = await resetPassword(
        {  
          password: password
        },
        token
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
    <div className='flex max-h-screen justify-center items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
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
        <form ref={form} className='w-full' onSubmit={resetPasswordSubmit}>  
          <PasswordInput value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
          <PasswordInput value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />  
          <CustomeButton disable={disable} name={"reset"} />
        </form> 
      </motion.div>
    </div>
  )
}