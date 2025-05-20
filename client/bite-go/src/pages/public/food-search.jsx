import React, { useState } from 'react'
import SearchType from '../../components/search-type'
import { Clock11Icon, DatabaseZap, Flame, SearchSlashIcon } from 'lucide-react'
import toaster from 'react-hot-toast';
import { getFoodAvailable, getFoodIn30Minute, getTopResturant } from '../../services/fooditems';
import CustomeSelect from '../../components/custome-select'
import AppStore from '../../store/appStore'    

export default function FoodSearch() {
  const { pinCodes } = AppStore();
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState([]);
  
  const getAvailable = async ()=>{ 
     try {  
      if(pincode === ''){
        toaster.error("You must choose a pincode first");
      }
      const response = await getFoodAvailable(pincode); 
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult(response.data);
    } catch (error) {
      toaster.error(`Error : ${error}`);
    }
  };

  const getTop = async ()=>{ 
     try {  
       if(pincode === ''){
        toaster.error("You must choose a pincode first");
      }
      const response = await getTopResturant(pincode); 
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult(response.data);
    } catch (error) {
      toaster.error(`Error : ${error}`);
    }
  };

  const getIn30Min = async ()=>{ 
     try {  
       if(pincode === ''){
        toaster.error("You must choose a pincode first");
      }
      const response = await getFoodIn30Minute(pincode); 
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setResult(response.data);
    } catch (error) {
      toaster.error(`Error : ${error}`);
    }
  };
 
  return (
    <div className='container'> 
      <div className='sub-container'>
        <span className='m-2'>
          <SearchSlashIcon size={55} color="#FE7531" /> 
        </span> 
        <h4 className='capitalize mb-2! text-4xl font-bold'>search food</h4>
        <p className='opacity-80 mb-8! mt-2! text-center text-md'>Search and get all waht you want in one click by choosing search type with pincode.</p> 

        <div className='w-full flex '>
          <CustomeSelect style='w-6/12' value={pincode} onChange={(e)=> setPincode(e.target.value)} data={pinCodes} name={"pincode"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">   
          <SearchType onClick={getAvailable} type={'Available'} icon={<DatabaseZap color='#FE7531' size={45} />} />
          <SearchType onClick={getTop} type={'Top Resturants'} icon={<Flame color='#FE7531' size={45} />} />
          <SearchType onClick={getIn30Min} type={'In 30 Minute'} icon={<Clock11Icon color='#FE7531' size={45} />} /> 
        </div>

        <div className='flex flex-col items-start justify-center mt-12'>
          <h1 className='font-bold text-2xl capitalize'>results:</h1>
          <div className='grid grid-cols-4 gap-8'> 
            {result}
          </div>
        </div>
      </div> 
    </div>
  )
}
