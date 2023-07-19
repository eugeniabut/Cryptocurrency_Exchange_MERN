
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
import SecuredRoutes from "./component/SecuredRoutes";
import DisplayUserBalance from './component/DisplayUserBalance'
import Profile from './component/Profile';
import { myStore } from "./myStore/dataStore.js";


function App() {
  const newsData=myStore((state)=>state.newsData)

const getData=myStore((state)=>state.getData )
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    userName:"",
    lastName:"",
    userEmail:"",
    userID:""
  
   })
  useEffect(()=>{
   getData()
 },[]);
   return (
    <div class="bg-animation" >
     <Header/>
     <Routes>
  
        <Route path="/register" element={<Registration/>} />
        <Route path="/trading-live" element={<TradingLive/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        
         <Route path="/profile" element={<Profile userData={userData}/>} />
        <Route path="/bank-data" element={<BankData/>} />
        <Route path="/bank-data" element={<SecuredRoutes></SecuredRoutes>} />

        <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} setUserData={setUserData} />}/>

        <Route path="/" element={<Home ></Home>} />
        {/* <Route path="/" element={<NewsCard />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}

        <Route path="/add-bank" element={<CreateAccount />} />
        <Route path="/get-bank" element={<DisplayUserBalance />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

      </Routes>
    
     <Footer/>
    </div>
  );
}

export default App;
