import { create } from 'zustand';  
import Image from '../assets/images/item.png'; 
 
const extractRole = (token)=>{
  const payloadBase64 = token.split('.')[1];
  const payloadJson = atob(payloadBase64);  
  const payload = JSON.parse(payloadJson);  
  return payload.userRole;
};

const AppStore = create((set) => ({ 
    user:null,
    setUser: (data) => set({ user: data }),
    token:'',
    setToken: (data) => set({ token: data }),
    isAuthenticated:false,
    setIsAuthenticated: (data) => set({ isAuthenticated: data }),
    isLoading:false,    
    setIsLoading: (data) => set({ isLoading: data }), 
    role: "user",
    setToken: (newToken) => {
      const userRole = extractRole(newToken);
      set({ token: newToken, role: userRole, isAuthenticated: true });
    },
    menus:[
        {_id: '121',name: 'burger king', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:4, image: Image},
        {_id: '121',name: 'burger king', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:2, image: Image},
        {_id: '121',name: 'burger king', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:5, image: Image},
        {_id: '121',name: 'burger king', description:'none', price:'132', category:'dessert', available:'true', readyTime:"20", rating:2, image: Image},
    ],  
    setMenus: (data) => set({ menus: data }), 
    discount:2,
    setDiscount: (data) => set({ discount: data }),
    cartItems:[
        { id:'212', name:"burger1", price:12, quantity:2, image: Image },
        { id:'213', name:"burger2", price:42, quantity:4, image: Image },
        { id:'214', name:"burger3", price:14, quantity:7, image: Image },
    ],
    setCartItems: (data) => set({ cartItems: data }), 
    addCartItem: (newItem) =>
        set((state) => { 
            const existingItemIndex = state.cartItems.findIndex(
            (item) => item.id === newItem.id
            );

            if (existingItemIndex !== -1) {
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return { cartItems: updatedItems };
            }

            return { cartItems: [...state.cartItems, newItem] };
        }), 
    orders:[
        {_id: '121',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
        {_id: '122',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},
        {_id: '123',totalAmount: '$2121', status:'Pending', userId:'132', vendorId:'344', deliveryId:'42'},  
    ],
    setOrders: (data) => set({ orders: data }),
    offers:[
        {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
        {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
        {_id: '121',discountPercentage: '3', pinCode:'121212', validFrom:'24/4/2025', validTo:'24/7/2025', isActive:'true'},
    ],
    setOffers: (data) => set({ offers: data }),
    restaurants:[
        { name:'mcdonald\'s', pinCode: '23522', phone:'+0221600377', rating:5, email:'mcdonald@gmail.com', address:'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'},
        { name:'mcdonald\'s', pinCode: '23522', phone:'+0221600377', rating:5, email:'mcdonald@gmail.com', address:'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'},
        { name:'mcdonald\'s', pinCode: '23522', phone:'+0221600377', rating:5, email:'mcdonald@gmail.com', address:'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'}
    ],
    setRestaurants: (data) => set({ restaurants: data }),
    users:[
        { name:'omar', pinCode: '23522', phone:'+0221600377', email:'omar@gmail.com', address:'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'},
    ],
    setUsers: (data) => set({ users: data }),
    vendors:[
        { name:'mcdonald\'s', pinCode: '23322', phone:'+0221600337', rating:5, email:'wafick@gmail.com', address:'نادي سموحة, Victor Amannuel St., Semouha Club, Victor Amanoiel Square, Alexandria Governorate'},
     ],
    setVendors: (data) => set({ vendors: data })
}));
  
export default AppStore;