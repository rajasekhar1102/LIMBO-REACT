import { Outlet} from "react-router-dom";
import  'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import NavBar from './components/navBar';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './services/authService';


function Home() {
  
 const [user,setUser]=useState(null);
 const[userProfile,setUserProfile]=useState(null);

  useEffect(()=>{
    const curUser=getCurrentUser();
    setUser(curUser);
  },[]);

  return (<>
  <ToastContainer/> 
    <main className='container'><NavBar user={user} userProfile={userProfile} /><Outlet  context={{User:user,setProfile:setUserProfile}} /> </main>

  </>);
}

export default Home;
