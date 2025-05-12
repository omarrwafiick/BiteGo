import React, { useState } from 'react' 
import SmallButtonSimple from '../../components/small-button-simple'
import InfoBox from '../../components/info-box'
import { User, X } from 'lucide-react'
import AppStore from '../../store/appStore'   
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'

export default function Profile() {
  const { role, pinCodes } = AppStore();
  const [showEdit, setShowEdit] = useState(false);
  const userEditSubmit = ()=>{
    if(role === "user"){

    }
    if(role === "vendor"){
 
    }
    if(role === "delivery"){

    }
    //request
  }
  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
            <div className='w-full flex flex-col justify-start items-center'>
              <span className='m-2'>
                <User size={55} color="#FE7531" /> 
              </span> 
              <h1 className='capitalize mb-8! text-3xl font-bold'>my profile</h1> 
            </div>
            <div className='flex flex-col justify-start items-center w-full p-6 bg-gray-200/80 mt-2 rounded-lg'>
              <div className='w-full flex justify-between items-center border-b-2 border-b-black/10'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>personal information</h1>
                <SmallButtonSimple onClick={() => setShowEdit(true)} name="edit" style={'bg-primary rounded-lg! text-white! capitalize mb-3'} /> 
              </div> 
              
              <div className='w-full grid grid-cols-3 gap-8 mt-6'>
                {
                  role === "user" ?  
                      <>  
                        <InfoBox title={'_id'} value={'1212'} />
                        <InfoBox title={'first name'} value={'omar'} />
                        <InfoBox title={'last name'} value={'wafick'} />  
                        <InfoBox title={'email'} value={'omarwafick@bitego.com'} />
                        <InfoBox title={'phone number'} value={'+20 128 331 1566'} />
                        <InfoBox title={'verified'} value={'true'} />
                      </> 
                  : 
                  role === "vendor" ?
                      <> 
                        <InfoBox title={'_id'} value={'1212'} />
                        <InfoBox title={'name'} value={'macdonald\'s'} />
                        <InfoBox title={'ownerName'} value={'omar wafick'} />  
                        <InfoBox title={'email'} value={'macdonald12k@bitego.com'} />
                        <InfoBox title={'phone number'} value={'+20 128 331 1566'} /> 
                        <InfoBox title={'isApproved'} value={'true'} />
                      </>
                  :
                  role === "delivery" ?
                      <> 
                        <InfoBox title={'_id'} value={'1212'} />
                        <InfoBox title={'driverName'} value={'omar wafick'} /> 
                        <InfoBox title={'created at'} value={'14/01/2002'} />
                        <InfoBox title={'email'} value={'waficko12@bitego.com'} />
                        <InfoBox title={'phone number'} value={'+20 128 331 1566'} />
                        <InfoBox title={'estimatedTime'} value={'40m'} /> 
                      </>
                  :
                      <> 
                        <h1 className='text-lg capitalize font-bold'>sorry there is nothing to show</h1>
                      </>
                }
              </div>
            </div>
            <div className='flex flex-col justify-start items-center bg-gray-200/80 w-full p-6 mt-6 mb-6 rounded-lg'>
              <div className='border-b-2 border-b-black/10 w-full'>
                <h1 className='text-xl capitalize font-semibold mb-4!'>address</h1> 
              </div>
              <div className='w-full grid grid-cols-3 gap-8 mt-6'>
                {
                  role === "user" || role === "delivery" || role === "vendor" ? 
                  <> 
                    <InfoBox title={'country'} value={'egypt'} />
                    <InfoBox title={'city'} value={'alexandria'} />
                    <InfoBox title={'pincode'} value={'12133'} /> 
                  </>
                  :
                  <> 
                    <h1 className='text-lg capitalize font-bold'>sorry there is nothing to show</h1>
                  </>
                }
              </div>
            </div>
        </div>
        {showEdit && role === "user" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-20! capitalize">edit profile</h2> 
                    <CustomeInput value="" onChange="" name={"first name"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"last name"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"phone number"} type={"text"}/>   
                    <CustomeInput value="" onChange="" name={"address"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"latitude"} type={"number"}/> 
                    <CustomeInput value="" onChange="" name={"longitude"} type={"number"}/> 
                    <CustomeButton name={"submit"} />
                </form>
              </div>      
        )}
        {showEdit && role === "vendor" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-60! capitalize">edit profile</h2> 
                    <CustomeInput value="" onChange="" name={"name"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"owner name"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"phone number"} type={"text"}/>   
                    <CustomeInput value="" onChange="" name={"address"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"latitude"} type={"number"}/> 
                    <CustomeInput value="" onChange="" name={"longitude"} type={"number"}/> 
                    <CustomeSelect value="" onChange="" data={["available", "not available"]} name={"service available"} />  
                    <CustomeSelect value="" onChange="" data={pinCodes} name={"pincode"} />  
                    <CustomeButton name={"submit"} />
                </form>
              </div>      
        )}
        {showEdit && role === "delivery" && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form onSubmit={userEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! mt-80! capitalize">edit profile</h2> 
                    <CustomeInput value="" onChange="" name={"driver name"} type={"text"}/> 
                    <CustomeSelect value="" onChange="" data={["Bike", "Car", "Van"]} name={"vehicle type"} />  
                    <CustomeInput value="" onChange="" name={"phone number"} type={"text"}/>   
                    <CustomeInput value="" onChange="" name={"address"} type={"text"}/> 
                    <CustomeInput value="" onChange="" name={"estimated time"} type={"number"}/>  
                    <CustomeInput value="" onChange="" name={"latitude"} type={"number"}/> 
                    <CustomeInput value="" onChange="" name={"longitude"} type={"number"}/> 
                    <CustomeSelect value="" onChange="" data={["available", "not available"]} name={"status"} />  
                    <CustomeSelect value="" onChange="" data={pinCodes} name={"pincode"} />  
                    <CustomeButton name={"submit"} />
                </form>
              </div>      
        )}
    </div>
  )
}
