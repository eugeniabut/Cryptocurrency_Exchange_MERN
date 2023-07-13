
import React, {useState,useEffect} from "react"
import Registration from './component/Registration';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';
import { Route, Routes } from "react-router-dom";
import AboutUs from './component/AboutUs';
import TradingLive from './component/TradingLive';
import "./App.css"
import CreateAccount from './component/CreateAccount';

import BankData from "./component/DisplayUserBalance";
import axios from "axios"
import SecuredRoutes from "./component/SecuredRoutes";

import DisplayUserBalance from './component/DisplayUserBalance'
import Profile from './component/Profile';


function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    userName:"",
    lastName:"",
    userEmail:"",
  
   });

  
  console.log(userData);
  return (
    <div >
     <Header/>
     <Routes>
      
        <Route path="/register" element={<Registration/>} />
        <Route path="/trading-live" element={<TradingLive/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        
         <Route path="/login/profile" element={<CreateAccount />} />
        <Route path="/bank-data" element={<BankData/>} />
        <Route path="/bank-data" element={<SecuredRoutes></SecuredRoutes>} />

        <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} setUserData={setUserData} />}/>

        <Route path="/" element={<Home  />} />
        {/* <Route path="*" element={<NotFound />} /> */}

       
        <Route path="/profile/add-bank" element={<CreateAccount />} />
        <Route path="/profile/get-bank" element={<DisplayUserBalance />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>
    
     <Footer/>
    </div>
  );
}

export default App;
