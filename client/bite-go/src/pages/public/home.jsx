import React ,{useEffect, useLayoutEffect, useState} from 'react'
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
import { CheckCircle, Dot, MessageCircleMore, Send, X } from 'lucide-react'; 
import Service from '../../components/service';
import P1 from '../../assets/images/p1.png'; 
import P2 from '../../assets/images/p2.png';  
import P3 from '../../assets/images/p3.png'; 
import CustomeInput from '../../components/custome-input';
import CustomeButton from '../../components/custome-button';
import Parts from '../../assets/images/parts.png'; 
import toaster from 'react-hot-toast';
import { contact } from '../../services/user';
import AppStore from '../../store/appStore';
import Icon from '../../assets/images/icon.png';  
import { getOrderStatus } from '../../services/order';

export default function Home() { 
  const { dialog } = AppStore();
  const aboutRef = useRef(null);    
  const contactRef = useRef(null);  
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const [showChat, setShowChat] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [hold, setHold] = useState(false)
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const messages = useRef(null); 
  const messagesInput = useRef(null); 

  const findDialogAnswer = (questionKey) => {
    const item = dialog.find(obj => obj.hasOwnProperty(questionKey));
    return item ? item[questionKey] : null;
  };

  const submitChatMessage = async ()=>{
    const content = document.createElement('div');
    content.className = 'ms-12 text-sm bg-gray-200 rounded-2xl p-2 mt-4';
    setHold(true);  
    await delay(800)
    if(chatMessage.toLowerCase().includes('profile') || chatMessage == 5){   
       content.textContent = findDialogAnswer('How do I update my profile?');
    }
    else if(chatMessage.toLowerCase().includes('delivery') || chatMessage == 4){   
       content.textContent = findDialogAnswer('What are your delivery hours'); 
    }
    else if(chatMessage.toLowerCase().includes('cancel') || chatMessage == 3){   
       content.textContent = findDialogAnswer('Can I cancel an order?');
    }
    else if(chatMessage.toLowerCase().includes('payment') || chatMessage == 2){   
       content.textContent = findDialogAnswer('What payment methods are supported?');
    }
    else if(chatMessage.toLowerCase().includes('order') || chatMessage == 1){   
      content.textContent = findDialogAnswer('How do I place an order?');
    }
    else if(chatMessage.toLowerCase().includes('status') || chatMessage == 6){
      //request to server to get order status
      try {
        const response = await getOrderStatus();
        if(response.status.ok()){ 
          content.textContent = response.data.status;
        } 
        else{
          throw new Error(`Request failed with status ${response.status}`);
        }
      } catch (error) {
          toaster.error('Can\'\t fetch order status');
          content.textContent = 'Failed to get order status due to network issues';
      }
    }
    else{
      //can't answer 
      const questions = dialog.map(obj => Object.keys(obj)[0]);
      const header = document.createElement('div');
      header.className = 'font-semibold'
      header.textContent = 'These are the questions i can answer you with confidence - choose a number.';
      content.appendChild(header);
      questions.map((q, i) => {
        const ques = document.createElement('div');
        ques.className = 'w-full text-sm mt-3 mb-3';
        ques.textContent = i+1 + ' - ' + q;
        content.appendChild(ques);
      }) 
    }
    setHold(false); 
    messages.current.appendChild(content);
    setChatMessage('');

    messagesInput.current.scrollIntoView({ behavior: 'smooth' });
  }

  const contactSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true); 
      const response = await contact(
        { 
          message,
          subject
        }
      );
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
     } catch (error) {
      toaster.error(`Error : ${error}`);
      form.current.reset();
    }
    setDisable(false)
  };

  const chatRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    if (showChat) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChat]);

  useLayoutEffect(() => { 
      if(location.hash === '#about'){
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      if(location.hash === '#contact'){
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
      } 
  }, [location]);

  return (
    <div className='w-full flex flex-col justify-center items-center'>  
      <Title>BiteGo - Home</Title>
      <Meta name="description" content="" />
      <motion.div
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
                    <SmallButton name="Order Now" style={'bg-primary text-white!'} to="restaurants"/>
                    <SmallButton name="Learn More" style={'bg-secondary ms-3!'} to="#about"/>
                </div> 
              </div>  
            </div>
            <div className='w-6/12 h-full flex justify-end items-center'>
                <img src={Cover} className="rounded-2xl w-11/12 mt-12 h-10/12" alt="bitego cover" loading='lazy' />
            </div>
      </motion.div>

      <motion.div className='w-10/12 flex flex-col justify-center items-center h-screen'>
            <div className='w-full flex justify-between items-center'>
              <div className='flex flex-col justify-center items-start'> 
                <h1 className='text-5xl capitalize font-medium'>our <a className='text-primary font-bold!'>popular</a> items</h1>
                <p className='opacity-80 text-md mt-4! capitalize'>
                    try our popular items, crafted with fresh, irresistible flavors.
                </p> 
              </div>
              <div>
                <SmallButton style={'bg-primary text-white! p-4!'} to="menus">
                    View All <span className="text-2xl rounded-full">{"  "}→</span>
                </SmallButton>
              </div>
            </div>
            <div className='flex justify-between w-full h-full mt-22'>
              <Popular title={'cheese pizza'} description={'free delivery for first order'} width={'w-5/12 me-4'} image={<img src={Image1} className="w-full h-full" alt="food image" loading='lazy' />} />
              <Popular title={'meat balls'} description={'free delivery for first order'} width={'w-7/12 '} image={<img src={Image2} className="w-full h-full" alt="food image" loading='lazy' />} />
            </div>
            <div className='flex justify-between w-full h-full -mt-12'>
              <Popular title={'stake meal'} description={'free delivery for first order'} width={'w-7/12 me-4'} image={<img src={Image3} className="w-full h-full" alt="food image" loading='lazy' />} />
              <Popular style={'bg-black/10!'} title={'hot dog'} description={'free delivery for first order'} width={'w-5/12 '} image={<img src={Image4} className="w-full h-full" alt="food image" loading='lazy' />} />
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

      <motion.div className='w-10/12 flex flex-col justify-center items-center h-screen'>
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='opacity-80 uppercase mb-6!'>— our services</p> 
            <h1 className='capitalize font-medium text-5xl'>bring quality and</h1>
            <h1 className='capitalize leading-20 text-5xl'><span className='font-medium'>convenience to{" "}</span><span className='text-primary font-bold'>your table</span></h1> 
            <p className='opacity-80 text-sm w-6/12 text-center mt-4! leading-7 capitalize'>
              our services include fast meal delivery, personalized catering, and more, all crafted with fresh ingredients
            </p>
          </div>
          <div className='w-full flex justify-evenly items-center mt-12'>
            <Service btnStyle={'bg-yellow-400'} title={'Stake'} image={<img src={P1} className="w-58 h-58" alt="food image" loading='lazy' />} />
            <Service btnStyle={'bg-cyan-400'} title={'Meat balls'} image={<img src={P2} className="w-58 h-58" alt="food image" loading='lazy' />} />
            <Service btnStyle={'bg-green-400'} title={'Pizza'} image={<img src={P3} className="w-58 h-58" alt="food image" loading='lazy' />} />
          </div>
      </motion.div>

      <motion.div ref={contactRef} id="contact" className='w-10/12 flex flex-col justify-center items-center h-screen'>
          <div className='w-full flex flex-col justify-center items-center'>
            <p className='opacity-80 uppercase mb-6!'>— contact us</p> 
            <h1 className='capitalize font-medium text-5xl'>reach us and</h1>
            <h1 className='capitalize leading-20 text-5xl'><span className='font-medium'>get support{" "}</span><span className='text-primary font-bold'>now</span></h1>  
          </div>
          <form ref={form} onSubmit={contactSubmit} className=' bg-gradient-to-br from-[#fe8a60] via-[#ff9e69] to-[#ff7777] rounded-2xl w-full flex flex-col justify-center items-center p-16 mt-10'>
            <CustomeInput titleStyle={'text-white!'} name="subject" type="text" value={subject} onChange={(e)=> setSubject(e.target.value)} style={'w-6/12!'}/>
            <CustomeInput titleStyle={'text-white!'} name="message" type="text" value={message} onChange={(e)=> setMessage(e.target.value)} style={'w-6/12! mt-2! mb-6!'}/>
            <CustomeButton disable={disable} name="contact" styles={'w-6/12!'} />
          </form>
      </motion.div>

      <span className='bg-white rounded-full p-3 shadow-2xl fixed bottom-6 z-20  right-12 cursor-pointer hover:scale-105 duration-100'><MessageCircleMore onClick={()=> setShowChat(true)} className='' size={45} color="#FF0000" /></span>
      {showChat && ( 
                    <div ref={chatRef} onClick={(e) => e.stopPropagation()} className='fixed z-30 right-6 bottom-0 bg-white h-120 overflow-auto scroll-auto pt-6 ps-6 pe-6 rounded-lg shadow-2xl flex flex-col justify-center items-evenly w-3/12'>
                        <X size={40} color="#FF0000" onClick={() => setShowChat(false)} className="cursor-pointer absolute top-0 right-0 px-2 py-2 rounded"></X>
                        <div className='w-full flex justify-start items-center mt-2'>
                            <img src={Icon} className="h-6 me-2" alt="bitego icon" /> 
                            <h2 className="text-xl font-bold capitalize text-center">biteGo chatbot</h2>   
                        </div>
                        <hr className='mb-2 mt-2 opacity-15' />
                        <div className='h-full w-full scroll-auto overflow-auto flex flex-col justify-between items-center'> 
                          <div className=''>
                              <div ref={messages} className='relative flex flex-col justify-start mt-2'>
                                <div className='ms-12 text-md bg-gray-200 rounded-2xl p-2'>Welcome this is bitego chatbot how can I help you.</div>
                              </div>
                              <span className={`ms-50 w-4/12 h-9 flex justify-center items-center mt-4 text-md bg-gray-200 rounded-2xl ${hold ? 'flex' : 'hidden'}`}>
                                <div class="loader"></div>
                              </span>
                          </div>
                          <div ref={messagesInput} className='static w-full flex justify-center items-end mt-4'>
                              <CustomeInput inputStyle={'p-1.5!'} titleStyle={'hidden'} placeholder='Write to me here...' type="text" value={chatMessage} onChange={(e)=> setChatMessage(e.target.value)} style={'me-2 p-0! w-10/12'}/>
                              <Send className='mb-4 cursor-pointer' size={30} color="#FF0000" onClick={submitChatMessage} />
                          </div>
                        </div>
                    </div>  
      )}
    </div>
  )
}
