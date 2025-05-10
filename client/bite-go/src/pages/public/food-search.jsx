import React from 'react'
import SearchType from '../../components/search-type'
import { Clock11Icon, DatabaseZap, Flame, IdCard, MapPinCheck, Search, SearchIcon, SearchSlashIcon } from 'lucide-react'
import CustomeInput from '../../components/custome-input'

export default function FoodSearch() {
  return (
    <div className='flex max-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
      <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
        <span className='m-2'>
          <SearchSlashIcon size={55} color="#FE7531" /> 
        </span>
        <h4 className='capitalize mb-2! text-4xl font-bold'>search food</h4>
        <p className='opacity-80 mb-8! mt-2! text-center text-md'>Search and get all waht you want in one click by choosing search type.</p> 
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"> 
          <SearchType type={'Available'} icon={<DatabaseZap color='#FE7531' size={45} />} />
          <SearchType type={'Top Resturants'} icon={<Flame color='#FE7531' size={45} />} />
          <SearchType type={'In 30 Minute'} icon={<Clock11Icon color='#FE7531' size={45} />} /> 
          <SearchType element={<CustomeInput style={'w-full'}/>} type={'Restaurant ID'} icon={<IdCard color='#FE7531' size={45} />} />
          <SearchType type={'PinCode'} icon={<MapPinCheck color='#FE7531' size={45} />} />
        </div>

        <div className='flex flex-col items-start justify-center mt-12'>
          <h1 className='font-bold text-2xl capitalize'>results:</h1>
          <div className='grid grid-cols-2 gap-8'> 

          </div>
        </div>
      </div> 
    </div>
  )
}
