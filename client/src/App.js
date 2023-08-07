
import React, {useState,useEffect,useContext} from "react"
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
import StorContext from "./context/index.js";
import MyWallet from "./component/MyWallet";
import NotFound from "./component/NotFound";
import CoinsBS from "./component/CoinsBS";


function App() {
 useContext(StorContext)
 const [wallet,setWallet]=useState([{}])
 const [bankData, setBankData] = useState({});
   const newsData=myStore((state)=>state.newsData)
   const [avatar, setAvatar] = useState("")
   const[counter,setCounter]=useState(0)
   const [selectedCrypt,setSelectedCrypt]=useState([{
  //   image:"",
  //   id:"",
	// 	current_price:0,
	// price_change_24h:0,
	// 	price_change_percentage_24h:0,
	// 	total_volume:0
}])
const [profileData, setProfileData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone:"",
  aboutMe:"",
  avatar:"",

});

const getData=myStore((state)=>state.getData )
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    userName:"",
    lastName:"",
    userEmail:"",
    userID:"",
    avatar:"",
   aboutMe:""
  
   })
   console.log(localStorage);

const logoutHandler = () => {
  console.log("test the logout");
  setAuthenticated(false);
  setAvatar(false)
  localStorage.removeItem("my-app-token");
  console.log(localStorage);
};
  useEffect(()=>{
   getData()
 },[]);
   return (
    <div className="bg-animation" >
    <StorContext.Provider value={{counter,setCounter,profileData, setProfileData,wallet,setWallet,bankData, setBankData, selectedCrypt,setSelectedCrypt,logoutHandler, avatar, setUserData,newsData,userData,setAuthenticated, authenticated}}>

     <Header/>
     <Routes>
  
        <Route path="/register" element={<Registration/>} />
        <Route path="/trading-live" element={<TradingLive />} />
        <Route path="/about-us" element={<AboutUs/>} />
         <Route path="/profile" element={<Profile />} />
        <Route path="/bank-data" element={<BankData/>} />
        {/* <Route path="/bank-data" element={<SecuredRoutes></SecuredRoutes>} /> */}

        <Route path="/login" element={<Login/>}/>

        <Route path="/" element={<Home  ></Home>} />
        <Route path="*" element={<NotFound />} />

        <Route path="/add-bank" element={<CreateAccount />} />
        <Route path="/get-bank" element={<DisplayUserBalance />} />
        <Route path="/my-wallet" element={<MyWallet />} />
        <Route  path="/coins" element={<CoinsBS/>}/>
      </Routes>
    
     <Footer/>
     </StorContext.Provider></div>
  );
}

export default App;
