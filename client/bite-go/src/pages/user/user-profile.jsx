import React from 'react'
import SmallButtonSimple from '../../components/small-button-simple'
import InfoBox from '../../components/info-box'
import { User } from 'lucide-react'

export default function UserProfile() {
  return (
     <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
             <div className='w-full flex flex-col justify-start items-center'>
              <span className='m-2'>
                <User size={55} color="#FE7531" /> 
              </span> 
              <h1 className='capitalize mb-8! text-3xl font-bold'>my profile</h1> 
            </div>
            <div className='flex flex-col justify-start items-center w-full p-6 bg-gray-200/70 mt-2 rounded-lg'>
              <div className='w-full flex justify-between items-center border-b-2 border-b-black/10'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>personal information</h1>
                <SmallButtonSimple name="edit" style={'bg-primary rounded-lg! text-white! capitalize mb-3'} /> 
              </div> 
               
              <div className='w-full grid grid-cols-3 gap-8 mt-6'>
                <InfoBox title={'_id'} value={'1212'} />
                <InfoBox title={'first name'} value={'omar'} />
                <InfoBox title={'last name'} value={'wafick'} />  
                <InfoBox title={'email'} value={'omarwafick@bitego.com'} />
                <InfoBox title={'phone number'} value={'+20 128 331 1566'} />
                <InfoBox title={'verified'} value={'true'} />
              </div>
            </div>
            <div className='flex flex-col justify-start items-center bg-gray-200/70 w-full p-6 mt-6 mb-6 rounded-lg'>
              <div className='border-b-2 border-b-black/10 w-full'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>address</h1> 
              </div>
              <div className='w-full grid grid-cols-3 gap-8 mt-6'>
                <InfoBox title={'country'} value={'egypt'} />
                <InfoBox title={'city'} value={'alexandria'} />
                <InfoBox title={'pincode'} value={'12133'} /> 
              </div>
            </div>
        </div>
    </div>
  )
}
