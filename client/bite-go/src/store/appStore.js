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
    setToken: (data) => set({ token: data }),
    isAuthenticated:false,
    setIsAuthenticated: (data) => set({ isAuthenticated: data }),
    isLoading:false,  
    setIsLoading: (data) => set({ isLoading: data }),
    items:[],  
    setItems: (data) => set({ items: data }),
    role: null,
    setToken: (newToken) => {
      const userRole = extractRole(newToken);
      set({ token: newToken, role: userRole, isAuthenticated: true });
    }
}));
  
export default AppStore;