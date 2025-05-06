import { useLocation } from 'react-router-dom';
import RoutesConfig from './routes';
import Header from './components/header';
import Footer from './components/footer';
import { HeadProvider } from 'react-head';

function App() {  
  const location = useLocation();
  return (
    <div className='font-gelasio'> 
      {location.pathname === '/' && <Header />}
      <HeadProvider>  
        <RoutesConfig />
      </HeadProvider>
      {location.pathname === '/' && <Footer />}
    </div> 
  );
}

export default App
