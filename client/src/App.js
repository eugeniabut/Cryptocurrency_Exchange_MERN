
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
import NewsCard from "./component/NewsCard";


function App() {
const [newsData,setNewsData]=useState([])
const[cryptosData,setCryptosData]=useState([])
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    userName:"",
    lastName:"",
    userEmail:"",
    userID:""
  
   });
const fetchNews=async()=>{
  
  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=333ad23a145a4832b2ca734696e3b06b',
  };

  try {
  	const response = await axios.request(options);
  setNewsData(response.data.articles);
  } catch (error) {
  	console.error(error);
  }
}
const fetchCryptos=async()=>{  
  
  const options = {
    method: 'GET',
    url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
      //url:"https://newsdata.io/api/1/crypto?apikey=pub_260065beaa4df95c2f842200733d53e9f2c3b"
  };

  try {
  	const response = await axios.request(options);
  setCryptosData(response.data);
  } catch (error) {
  	console.error(error);
  }}
  useEffect(()=>{
    fetchCryptos()
fetchNews()
 },[]);
 console.log(cryptosData);
  return (
    <div >
     <Header/>
     <Routes>
    
        <Route path="/register" element={<Registration/>} />
        <Route path="/trading-live" element={<TradingLive/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        
         <Route path="/profile" element={<Profile userData={userData}/>} />
        <Route path="/bank-data" element={<BankData/>} />
        <Route path="/bank-data" element={<SecuredRoutes></SecuredRoutes>} />

        <Route path="/login" element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated} setUserData={setUserData} />}/>

        <Route path="/" element={<Home newsData={newsData} cryptosData={cryptosData} ></Home>} />
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
