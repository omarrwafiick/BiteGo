import { Menu, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore';
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import { updatetVendorMenu } from '../../services/vendor';
import { getResturantById, removeFoodItem } from '../../services/fooditems';
import toaster from 'react-hot-toast'; 

export default function ManageMenu() {
  var { user } = AppStore();
  const [menus, setMenus] = useState([]);

  const fetchData = async ()=>{
    setMenus((await getResturantById(user._id)).data); 
  };

  useEffect(()=>{
    fetchData();
  },[]);
 
  const [showConfirm, setShowConfirm] = useState(false);
  const [menu, setMenu] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const {image, ...rest} = menus[0];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(false);
  const [readyTime, setReadyTime] = useState(0); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
 
  const handlePageButtonClick = (menuDeleted) => {
    setMenu(menuDeleted);
    setShowConfirm(true); 
  };

  const handleConfirmResult = async (confirmed) => {
    setShowConfirm(false);
    if (confirmed) {
      try {
      const response = await removeFoodItem(menu._id);
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
     } 
    } 
  };

  const menuEdit= (data)=>{
    setMenu(data);
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price);
    setAvailable(data.available);
    setCategory(data.category);
    setReadyTime(data.readyTime);
    setShowEdit(true);
  } 

  const menuEditSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true)  
      const response = await updatetVendorMenu(
        { 
          name,
          description,
          price,
          category,
          available,
          readyTime
        },
        menu._id
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

  return (
    <div className='flex min-h-screen justify-start items-center flex-col w-full bg-gradient-to-br from-[#F66A35] via-[#FF8C4D] to-[#c9c9c9]'> 
        <div className='flex justify-center items-center flex-col w-10/12 bg-white rounded-2xl ps-16 pe-16 pt-10 pb-10 mt-6 mb-6 shadow-lg'>
          <span className='m-2'>
            <Menu size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>menus</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vendor you can monitor, update and delete menus related to your restaurant.</p>
          <CustomeTable 
            colsNames={Object.keys(rest)}  
            isDelete={true}
            onDelete={handlePageButtonClick}
            isEdit={true}
            onEdit={menuEdit}
            data={menus.map(({image, ...rest}) => rest)}/>
        </div>
        <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
        {showEdit && (
              <div onClick={() => setShowEdit(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form ref={form} onSubmit={menuEditSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-11/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize mt-16!">edit menu</h2> 
                      <CustomeInput value={name} onChange={(e)=> setName(e.target.value)} name={"name"} type={"text"}/>  
                      <CustomeInput value={description} onChange={(e)=> setDescription(e.target.value)} name={"description"} type={"text"}/>  
                      <CustomeInput value={price} onChange={(e)=> setPrice(e.target.value)} name={"price"} type={"number"}/>  
                      <CustomeSelect style={'text-black!'} value={category} onChange={(e)=> setCategory(e.target.value)} data={["Fast Food", "Dessert", "Beverage", "Main Course"]} name={"category"} />  
                      <CustomeSelect style={'text-black!'} value={available} onChange={(e)=> setAvailable(e.target.value)} data={["yes", "no"]} name={"available"} />  
                      <CustomeInput value={readyTime} onChange={(e)=> setReadyTime(e.target.value)} name={"ready time"} type={"number"}/>  
                      <CustomeButton disable={disable} name={"submit"} />
                </form>
              </div>      
        )} 
    </div>
  )
} 