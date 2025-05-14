import { useLocation } from 'react-router-dom';
import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { HeadProvider } from 'react-head';
import { useEffect } from 'react';
import AppStore from './store/appStore'    
import { checkAuth } from './services/auth';
import { useNavigate } from 'react-router-dom';

function App() {  
  const { setIsAuthenticated, setUser, role } = AppStore();
  const navigate = useNavigate();

  const AuthUser = async ()=>{
    try {
      const response = await checkAuth(role);
      if(!response.ok()){
        throw new Error(`Request failed with status ${response.status}`);
      }
      setIsAuthenticated(response.data.authenticated);
      setUser(response.data.user);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(()=>{
    AuthUser();
  },[]);

  const location = useLocation();
  return (
    <div className='font-montserrat'> 
      {location.pathname === '/' && <Header />}
      <HeadProvider>  
        <RoutesConfig />
      </HeadProvider>
      {location.pathname === '/' && <Footer />}
    </div> 
  );
}

export default App
