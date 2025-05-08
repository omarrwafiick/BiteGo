import React ,{useLayoutEffect} from 'react'
import { motion } from "framer-motion";  
import { Title, Meta } from 'react-head';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Cover from '../../assets/images/cover.png'; 
import SmallButton from '../../components/small-button';
import Image1 from '../../assets/images/f1.png'; 
import Image2 from '../../assets/images/f2.png'; 
import Image3 from '../../assets/images/f3.png'; 
import Image4 from '../../assets/images/f4.png'; 
import Popular from '../../components/popular';
import { CheckCircle } from 'lucide-react';
import Service from '../../components/service';
import P1 from '../../assets/images/p1.png'; 
import P2 from '../../assets/images/p2.png'; 
import P3 from '../../assets/images/p3.png'; 
import CustomeInput from '../../components/custome-input';
import CustomeButton from '../../components/custome-button';
import Parts from '../../assets/images/parts.png'; 

export default function Home() {
  const heroRef = useRef(null);  
  const popularRef = useRef(null);  
  const aboutRef = useRef(null);  
  const servicesRef = useRef(null);  
  const contactRef = useRef(null);  
  const location = useLocation();

  useLayoutEffect(() => {
      if(location.hash === '#hero'){
        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if(location.hash === '#popular'){
        popularRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if(location.hash === '#about'){
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if(location.hash === '#contact'){
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if(location.hash === '#services'){
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
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
                <img src={Cover} className="rounded-2xl w-11/12 mt-12 h-10/12" alt="bitego cover" loading='lazy' />
            </div>
      </motion.div>

      <motion.div ref={popularRef} id="popular" className='w-10/12 flex flex-col justify-center items-center h-screen'>
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
            <div className='flex justify-between w-full h-full mt-22'>
              <Popular title={'cheese pizza'} description={'free delivery for first order'} width={'w-5/12 me-4'} image={<img src={Image1} className="w-full h-full" alt="food image" loading='lazy' />} />
              <Popular title={'cheese pizza'} description={'free delivery for first order'} width={'w-7/12 '} image={<img src={Image2} className="w-full h-full" alt="food image" loading='lazy' />} />
            </div>
            <div className='flex justify-between w-full h-full -mt-12'>
              <Popular title={'cheese pizza'} description={'free delivery for first order'} width={'w-7/12 me-4'} image={<img src={Image3} className="w-full h-full" alt="food image" loading='lazy' />} />
              <Popular title={'cheese pizza'} description={'free delivery for first order'} width={'w-5/12 '} image={<img src={Image4} className="w-full h-full" alt="food image" loading='lazy' />} />
            </div>   
      </motion.div>

      <motion.div ref={aboutRef} id="about" className='w-10/12 flex justify-center items-center h-screen'>
          <div className='w-6/12 h-full flex justify-center items-center'>
            <img src={Parts} className="rounded-2xl w-full mt-12 h-auto" alt="food image" loading='lazy' />
          </div>
          <div className='w-6/12 flex flex-col justify-center items-start p-12'>
            <p className='opacity-80 uppercase mb-6!'>— about us</p> 
            <h1 className='capitalize font-medium text-5xl'>inspired by taste,</h1>
            <h1 className='capitalize leading-20 text-5xl'><span className='font-medium'>build on{" "}</span><span className='text-primary font-bold'>quality</span></h1> 
            <p className='opacity-80 text-sm w-10/12 text-start mt-4! leading-7 capitalize'>
              passionate about quality, we create delicious meals with fresh ingredients and care.
            </p>
            <ul className='mt-4!'>
              <li className='flex mt-3 capitalize'><CheckCircle className='me-2' color='#FE7531' /> fresh food, fast delivery</li>
              <li className='flex mt-3 capitalize'><CheckCircle className='me-2' color='#FE7531' />taste the freshness in every bite</li>
              <li className='flex mt-3 capitalize'><CheckCircle className='me-2' color='#FE7531' />10% off every sunday for all food items</li>
            </ul>
          </div>
      </motion.div>

      <motion.div ref={servicesRef} id="services" className='w-10/12 flex flex-col justify-center items-center h-screen'>
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='opacity-80 uppercase mb-6!'>— our services</p> 
            <h1 className='capitalize font-medium text-5xl'>bring quality and</h1>
            <h1 className='capitalize leading-20 text-5xl'><span className='font-medium'>convenience to{" "}</span><span className='text-primary font-bold'>your table</span></h1> 
            <p className='opacity-80 text-sm w-6/12 text-center mt-4! leading-7 capitalize'>
              our services include fast meal delivery, personalized catering, and more, all crafted with fresh ingredients
            </p>
          </div>
          <div className='w-full flex justify-evenly items-center mt-12'>
            <Service btnStyle={'bg-yellow-400'} title={'Pizza'} image={<img src={P1} className="w-58 h-58" alt="food image" loading='lazy' />} />
            <Service btnStyle={'bg-cyan-400'} title={'Meat balls'} image={<img src={P2} className="w-58 h-58" alt="food image" loading='lazy' />} />
            <Service btnStyle={'bg-green-400'} title={'Stake'} image={<img src={P3} className="w-58 h-58" alt="food image" loading='lazy' />} />
          </div>
      </motion.div>

      <motion.div ref={contactRef} id="contact" className='w-10/12 flex flex-col justify-center items-center h-screen'>
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='opacity-80 uppercase mb-6!'>— contact us</p> 
            <h1 className='capitalize font-medium text-5xl'>reach us and</h1>
            <h1 className='capitalize leading-20 text-5xl'><span className='font-medium'>get support{" "}</span><span className='text-primary font-bold'>now</span></h1>  
          </div>
          <form className='bg-gradient-to-br from-[#f0f0f0] via-[#d6d6d6] to-[#bebebe] rounded-2xl w-full flex flex-col justify-center items-center p-16 mt-10'>
            <CustomeInput name="subject" type="" value="" onChange style={'w-6/12!'}/>
            <CustomeInput name="message" type="" value="" onChange style={'w-6/12! mt-2! mb-6!'}/>
            <CustomeButton name="contact" styles={'w-6/12!'} onClick="" />
          </form>
      </motion.div>
    </div>
  )
}
