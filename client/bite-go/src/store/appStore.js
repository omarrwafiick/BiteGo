import { create } from 'zustand';   

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
    removeToken: () => set({ token: null }),
    isAuthenticated:false,
    setIsAuthenticated: (data) => set({ isAuthenticated: data }),
    isLoading:false,    
    setIsLoading: (data) => set({ isLoading: data }), 
    role: "user",    
    removeRole: () => set({ token: '' }),
    setToken: (newToken) => {
      const userRole = extractRole(newToken);
      set({ token: newToken, role: userRole, isAuthenticated: true });
    }, 
    menus:[
    ],  
    setMenus: (data) => set({ menus: data }), 
    discount:2,
    setDiscount: (data) => set({ discount: data }),
    cartItems:[
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

            return { cartItems: [...state.cartItems, newItem] };}), 
    orders:[   
    ],
    setOrders: (data) => set({ orders: data }),
    offers:[ 
    ],
    setOffers: (data) => set({ offers: data }),
    restaurants:[
    ],
    setRestaurants: (data) => set({ restaurants: data }),
    users:[
    ],
    setUsers: (data) => set({ users: data }),
    vendors:[
     ],
    setVendors: (data) => set({ vendors: data }),
    deliveries:[
    ],
    setDeliveries: (data) => set({ vendors: data }),
    pinCodes:[
        "11511", // Downtown Cairo
        "21519", // Al Attarin, Alexandria
        "12511", // Giza
        "13411", // Shubra El-Kheima
        "42511", // Port Said
        "43511", // Suez
        "85951", // Luxor
        "35511", // Mansoura
        "31511", // Tanta
        "71511", // Asyut
        "11865", // Nasr City, Cairo
        "12655", // Mohandessin, Giza
        "23512", // Smouha, Alexandria
        "41618", // Ismailia
        "83511", // Aswan
        "81511", // Minya
        "63511", // Hurghada
        "67111", // Sohag
        "62111", // Qena
        "64111", // Beni Suef
        "11311", // Heliopolis, Cairo
        "12211", // Dokki, Giza
        "22511", // Damanhour
        "23311", // Kafr El Dawwar
        "82611", // Kom Ombo, Aswan
        "83512", // Edfu, Aswan
        "73711", // Fayoum
        "73511", // Beni Suef (Secondary)
        "43811", // Damietta
        "64112", // Al Wasta, Beni Suef
        "62511", // Quseer, Red Sea
        "82711", // Daraw, Aswan 
        "23711", // Rosetta
        "35611", // Kafr El-Sheikh
        "21711", // Sporting, Alexandria
        "12556", // Haram, Giza
        "62211", // New Valley
        "11765", // Maadi, Cairo
        "11111", // Garden City, Cairo
        "11341", // Zamalek, Cairo
        "11668", // Mokattam, Cairo
        "44611", // Sharkia
        "23522", // Alexandria, Montazah
        "52711", // Shebin El Kom
        "42522", // Port Fouad
        "12311", // Agouza, Giza
        "63512", // El Gouna, Red Sea
        "42711", // Manshiyat Naser
        "63711", // Safaga, Red Sea
        "24611"  // Marsa Matruh
    ], 
    totalPrice: 0,
    setTotalPrice: (data) => set({ totalPrice: data }),
    paymentMode: "", 
    setPaymentMode: (data) => set({ paymentMode: data }),
    offerId: "",
    setOfferId: (data) => set({ offerId: data }),
    vendorId: "", 
    setVendorId: (data) => set({ vendorId: data }),
    orderId: "",
    setOrderId: (data) => set({ orderId: data }),
    orderDetails:null,
    setOrderDetails: (data) => set({ orderDetails: data }),
    transactionId:"", 
    setTransactionId: (data) => set({ transactionId: data }),
    setOrderDetails: (data) => set({ orderDetails: data }),
    dialog : [ 
      {"How do I place an order?":"You can check resturants we have that may have offers at the time then check there menu and after choosing an item and place item to cart you can check out and pay for it then order will be in progress within the estimated time."},
      {"What payment methods are supported?":"At the momemnt online payment is our main method using paypal but we will expand soon and include other methods like other gateways and cash"},
      {"Can I cancel an order?":"You can press profile button at the navbar and navigate to your orders table then press cancel and that's it"},
      {"What are your delivery hours?":"We are 24/7 available but it depends on the vendor/restaurant you can check if available through restaurant card"},
      {"How do I update my profile?":"You can press profile button at the navbar and navigate to your profile that display your information then press edit button and submit, that's it"},
      {"What is my latest order status?": ''}
    ]
}));
  
export default AppStore;