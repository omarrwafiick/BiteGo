import React, { useEffect, useState } from 'react'
import CartItem from '../../components/cart-item'
import { ShoppingBag } from 'lucide-react';
import CustomeButton from '../../components/custome-button'
import { useNavigate } from 'react-router-dom';
import AppStore from '../../store/appStore';
import { getCartItems, updateCart } from '../../services/cart';

export default function Cart(){ 
  var { setTotalPrice } = AppStore();
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);   
  const navigate = useNavigate();  
  var [total, setTotal] = useState(0); 
 
  const fetchData = async ()=>{
    setItems((await getCartItems()).data);
    items.map(item => setDiscount(discount + item.offerId.discountPercentage) );
  };

  const updateData = async ()=>{
    const cartItems = items.filter(item => ({foodId: item._id, quantity: item.quantity, price: item.price}));
    await updateCart(cartItems);
  }; 
 
  useEffect(() => { 
    updateData();
    fetchData();
    const calculatedTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(calculatedTotal);
    setTotalPrice(calculatedTotal);
  }, [items]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ); 
    setItems(updatedItems); 
    const newTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity,0); 
    setTotal(newTotal);
  };
  
  return (
    <div className='container'> 
        <div className='sub-container'>
          <span className='m-2'>
            <ShoppingBag size={55} color="#FE7531" /> 
          </span>
          <h4 className='capitalize mb-10! mt-2! text-3xl font-bold'>shopping cart</h4>
          <div className='flex w-full'>
            <div className='w-8/12 h-full'>
                <table className="w-full text-left rtl:text-right text-gray-500">
                  <thead className="text-lg text-gray-700 uppercase bg-gray-200/80 mt-3">
                      <tr>
                          <th scope="col" className="px-6 py-3 capitalize">
                              product 
                          </th>
                          <th scope="col" className="px-6 py-3 capitalize">
                              price
                          </th>
                          <th scope="col" className="px-6 py-3 capitalize">
                              quantity
                          </th>
                          <th scope="col" className="px-6 py-3 capitalize">
                              total price
                          </th>
                      </tr>
                  </thead>
                  <tbody className='text-md'>
                     {items.map(item => (
                                  <CartItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                    image={<img src={item.image} className="w-32 h-32"/>}
                                    onQuantityChange={handleQuantityChange}
                                  />
                                ))}
                  </tbody>
                </table> 
            </div>
            <div className='w-4/12 h-full '>
                <div className='flex flex-col justify-start items-center'>
                  <h2 className='capitalize text-center text-xl font-bold px-6! py-3! w-full bg-gray-200/80 mt-3'>calculated total price</h2>
                  <p className='text-sm opacity-75 w-10/12 mt-6!'>final price you will pay if there is any discount/offer it will be used and deduct the total price</p>
                  <div className='w-10/12 mt-8'>
                    <div className='w-full flex justify-between items-center'>
                      <h4 className='capitalize text-md font-semibold w-full'>cart subtotal</h4>
                      <span>{total}</span>
                    </div>
                    <div className='w-full flex justify-between items-center mt-4'>
                      <h4 className='capitalize text-md font-semibold w-full'>discount</h4>
                      <span>{discount}%</span>
                    </div>
                    <div className='w-full flex justify-between items-center mt-4 border-t-2 border-black/10'>
                      <h4 className='capitalize text-md font-semibold w-full mt-4!'>total</h4> 
                      <span>{total-(total*discount/100)}</span>
                    </div>
                  </div>  
                  <CustomeButton onClick={()=> navigate('/user/payment')} styles={'w-10/12 mt-2'} name={"payment"} />
                </div>
            </div> 
          </div>
          
        </div> 
    </div> 
  )
}
 