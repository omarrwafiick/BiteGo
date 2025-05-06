import React ,{useLayoutEffect} from 'react'
import { motion } from "framer-motion";  
import { Title, Meta } from 'react-head';
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cover from '../../assets/images/cover.png'; 
import SmallButton from '../../components/small-button';

export default function Home() {
  const heroRef = useRef(null);  
  const location = useLocation();

  useLayoutEffect(() => {
      if(location.hash === '#hero'){
        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [location]);

  return (
    <div className='w-full flex flex-col justify-center items-center'>  
      <Title>BiteGo - Home</Title>
      <Meta name="description" content="" />
      <motion.div ref={heroRef} id="hero"
          variants={{
            hidden:{opacity:0, y:75},
            visible:{opacity:1, y:0},
          }}
          initial="hidden"
          animate="visible"
          transition={{duration:0.5, delay:0.25}}
          className='w-10/12 h-screen flex justify-center items-center'>
            <div className='w-6/12 h-full flex flex-col justify-center items-center mt-20'>
              <div className='flex flex-col items-start'>
                <p className='opacity-80 uppercase mb-6!'>— fresh & delicious</p>
                <h1 className='capitalize font-medium text-6xl'>delicious meals</h1>
                <h1 className='capitalize leading-20 text-5xl'><span className='text-primary font-bold'>delivered</span><span className='font-medium'>{" "}to your door</span></h1> 
                <p className='opacity-80 text-md w-10/12 text-start mt-4! leading-7 capitalize'>
                    enjoy fresh, flavorful meals made with the finest ingredients, delivered straight to your door, every time.
                </p> 
                <div className='flex justify-start items-center w-full mt-8'> 
                    <SmallButton name="Order Now" style={'bg-primary text-white!'} to=""/>
                    <SmallButton name="Learn More" style={'bg-secondary ms-3!'} to=""/>
                </div> 
              </div> 
            </div>
            <div className='w-6/12 h-full flex justify-end items-center'>
                <img src={Cover} className="rounded-2xl w-full mt-12 h-10/12" alt="bitego cover" />
            </div>
        </motion.div>

        <motion.div className='w-10/12 flex justify-center items-center'>
            <div className='w-full flex justify-between items-center'>
              <div className='flex flex-col justify-center items-start'> 
                <h1 className='text-5xl capitalize font-medium'>our <a className='text-primary font-bold!'>popular</a> items</h1>
                <p className='opacity-80 text-md mt-4! capitalize'>
                    try our popular items, crafted with fresh, irresistible flavors.
                </p> 
              </div>
              <div>
                <SmallButton style={'bg-primary text-white! p-4!'} to="">
                    View All <span className="text-2xl rounded-full">{"  "}→</span>
                </SmallButton>
              </div>
            </div>

            
        </motion.div>
    </div>
  )
}
