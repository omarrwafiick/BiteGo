import React, { useState } from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import CustomeSelect from '../../components/custome-select';
import AppStore from '../../store/appStore'  
import { login } from '../../services/auth';
import toaster from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { setToken, setUser, setIsAuthenticated } = AppStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
 
  const loginSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true)   
      const response = await login(
        { 
          email,
          password,
          type
        }
      );
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setToken(response.data.token);
      setUser(response.data.user); 
      setIsAuthenticated(true);
      toaster.success("Request was sent successfully");
      navigate('/');
    } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false)
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
        <form ref={form} className='w-full' onSubmit={loginSubmit}> 
          <CustomeInput  value={email} onChange={(e)=> setEmail(e.target.value)} name={"email"} type={"email"}/> 
          <PasswordInput value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
          <div className='w-full flex pt-2 pb-3'> 
            <CustomeSelect value={type} onChange={(e)=> setType(e.target.value)} style={'w-full'} data={['user', 'delivery', 'admin','vendor']} name={'role'} /> 
          </div>
          <div className='w-full flex justify-between mb-2 mt-2'> 
            <Link className='capitalize cursor-pointer text-sm' to="/forget-password">forget password?</Link>
          </div>
          <CustomeButton disable={disable} name={"login"} />
        </form>
        <p className='capitalize mt-5!'>don't have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/signup">signup</Link></p>
      </motion.div>
    </div>
  )
}
 