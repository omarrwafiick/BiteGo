import { Ticket, X } from 'lucide-react';
import React, { useState } from 'react'
import CustomeTable from '../../components/custome-table'
import AppStore from '../../store/appStore';
import ConfirmAction from '../../components/confirm-action'
import CustomeInput from '../../components/custome-input'
import CustomeButton from '../../components/custome-button'
import CustomeSelect from '../../components/custome-select'
import { updateOffers, getVendorOffers, removeVendorOffer, addVendorOffers } from '../../services/offer'; 
import toaster from 'react-hot-toast'; 

export default function ManageOffers() {
  var { user } = AppStore();
  const [offers, setOffers] = useState([]);

  const fetchData = async ()=>{
    setOffers((await getVendorOffers(user._id)).data);  
  };

  useEffect(()=>{
    fetchData();
  },[]); 

  const [offer, setOffer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [discount, setDiscount] = useState('');
  const [validTo, setValidTo] = useState(Date.UTC);
  const [itemId, setItemId] = useState('');
  const [isActive, setIsActive] = useState(false); 
  const form = useRef();  
  const [disable, setDisable] = useState(false);
  const [isNew, setIsNew] = useState(false);


  const handlePageButtonClick = (data) => {
    setOffer(data);
    setShowConfirm(true); 
  };

  const handleConfirmResult = async (confirmed) => {
    setShowConfirm(false);
    if (confirmed) {
      try {
      const response = await removeVendorOffer(offer._id);
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      toaster.success("Request was sent successfully");
    } catch (error) {
      toaster.error(`Error : ${error}`);
     } 
    } 
  };

  const offerEdit = (data)=>{
    setIsNew(false);
    setDiscount(data.discount);
    setIsActive(data.isActive);
    setValidTo(data.validTo);
    setShowEdit(true);
  }

  const offerAdd = (data)=>{ 
    setIsNew(true);
    setShowForm(true);
  }

  const offerSubmit = async (e)=>{ 
     try {
      e.preventDefault();  
      setDisable(true)  
      var response = null;
      if(isNew){
        response = await addVendorOffers(
          {          
            discountPercentage: discount,
            validTo,
            isActive,
            itemId: itemId
          },
        );
      }
      else{ 
        response = await updateOffers(
          { 
            discountPercentage: discount,
            validTo,
            isActive,
            itemId:''
          }
        );
      }
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
    <div className='container'> 
        <div className='sub-container'>
          <span className='m-2'>
            <Ticket size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-2! text-4xl font-bold'>offers</h4>
          <p className='opacity-80 mb-8! mt-2! text-center text-md'>As an vandor you can manage offers of your restaurant, you can monitor, update and delete the offer.</p>
          <CustomeTable 
            colsNames={ Object.keys(offers[0]) } 
            onAdd={offerAdd}
            isAdd={true}
            isDelete={true}
            onDelete={handlePageButtonClick}
            isEdit={true}
            onEdit={offerEdit}
            data={offers}/> 
        </div> 
        <ConfirmAction visible={showConfirm} result={handleConfirmResult} />
         {showForm && (
              <div onClick={() => setShowForm(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                <form ref={form} onSubmit={offerSubmit} onClick={(e) => e.stopPropagation()} className='relative bg-white h-8/12 overflow-auto scroll-auto p-6 rounded-lg shadow-lg flex flex-col justify-center items-evenly w-6/12'>
                    <X size={55} color="#FF0000" onClick={() => setShowEdit(false)} className="cursor-pointer absolute top-0 right-0 px-4 py-2 rounded"></X>
                    <h2 className="text-2xl font-bold mb-6! capitalize">{ isNew ? 'add offer' : 'edit offer'}</h2> 
                    {
                      isNew ? 
                        <CustomeInput value={itemId} onChange={(e)=> setItemId(e.target.value)} name={"item id"} type={"text"}/> 
                      :
                        <></>
                    }
                    <CustomeInput value={discount} onChange={(e)=> setDiscount(e.target.value)} name={"discount Percentage"} type={"text"}/> 
                    <CustomeInput value={validTo} onChange={(e)=> setValidTo(e.target.value)} name={"validTo"} type={"date"}/> 
                    <CustomeSelect value={isActive} onChange={(e)=> setIsActive(e.target.value)} data={['yes', 'no']} name={"isActive"} />  
                    <CustomeButton disable={disable} name={"submit"} />
                </form>
              </div>      
          )}  
    </div>
  )
} 
