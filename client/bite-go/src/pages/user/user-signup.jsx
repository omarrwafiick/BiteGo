import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion';
import CustomeButton from '../../components/custome-button'
import CustomeInput from '../../components/custome-input'
import PasswordInput from '../../components/password-input' 
import { Link } from 'react-router-dom';
import { User } from 'lucide-react'; 
import {passwordRegex} from '../../utils/main';
import { signupUser } from '../../services/user';
import toaster from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function UserSignup() { 
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const signupSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true) 
      if(!passwordRegex.test(password)){
        toaster.error("Password is very week");
        return;
      } 
      const response = await signupUser(
        { 
          firstName: fName,
          lastName: lName,
          address: address,
          phone: phone,  
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
              <User size={55} color="#FE7531" /> 
            </span>
            <h4 className='capitalize mb-2! text-3xl font-bold'>welcome to biteGo</h4>
            <p className='opacity-80 mb-8!'>We are so pleased to begin our journey with you.</p>
            <form ref={form} className='flex flex-col  items-center w-full' onSubmit={signupSubmit}> 
              <div className='flex justify-center w-full'> 
                <div className='flex flex-col items-center justify-center w-6/12'> 
                  <CustomeInput style='w-10/12'  value={fName} onChange={(e)=> setFName(e.target.value)} name={"first name"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value={lName} onChange={(e)=> setLName(e.target.value)} name={"last name"} type={"text"}/> 
                  <CustomeInput style='w-10/12' value={email} onChange={(e)=> setEmail(e.target.value)} name={"email"} type={"email"}/>  
                  <CustomeInput style='w-10/12' value={address} onChange={(e)=> setAddress(e.target.value)} name={"address"} type={"text"}/> 
                </div>
                <div className='flex flex-col items-center justify-start w-6/12'>    
                  <CustomeInput style='w-10/12' value={phone} onChange={(e)=> setPhone(e.target.value)} name={"phone"} type={"text"}/> 
                  <PasswordInput style='w-10/12' value={password} onChange={(e)=> setPassword(e.target.value)} name={"password"} />
                  <PasswordInput style='w-10/12' value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} name={"confirm password"} />   
                  <CustomeButton disable={disable} styles='w-10/12 mt-3' name={"signup"} />
                </div> 
              </div> 
            </form>
            <p className='capitalize mt-5!'>already have an account? <Link className='underline underline-offset-2 font-medium cursor-pointer' to="/login">login</Link></p>
          </motion.div>
        </div>
  )
}
 