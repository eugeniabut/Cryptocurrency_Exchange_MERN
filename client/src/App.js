import React, { useState, useEffect, useContext } from "react";
import Registration from "./component/Registration";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Home from "./component/Home";
import Login from "./component/Login";
import { Route, Routes } from "react-router-dom";
import AboutUs from "./component/AboutUs";
import TradingLive from "./component/TradingLive";
import "./App.css";
import CreateAccount from "./component/CreateAccount";
import BankData from "./component/DisplayUserBalance";
import SecuredRoutes from "./component/SecuredRoutes";
import DisplayUserBalance from "./component/DisplayUserBalance";
import Profile from "./component/Profile";
import { myStore } from "./myStore/dataStore.js";
import StorContext from "./context/index.js";
import MyWallet from "./component/MyWallet";
import NotFound from "./component/NotFound";
import CoinsBS from "./component/CoinsBS";
import axios from "axios";
import CoinsToSell from "./component/CoinsToSell";

function App() {
  useContext(StorContext);
  const [wallet, setWallet] = useState([{}]);
  const [checkUserId, setCheckUserId] = useState(false);
  const [coinsToSell, setCoinsToSell] = useState([{}]);
  const [value, setValue] = useState([0])

  const [countSell, setCountSell] = useState(0);
  const [bankData, setBankData] = useState({});
  const newsData = myStore((state) => state.newsData);
  const [avatar, setAvatar] = useState("");
  const [counter, setCounter] = useState(1);
  const [walletList, setWalletList] = useState([{}]);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCrypt, setSelectedCrypt] = useState([
    {
      //   image:"",
      //   id:"",
      // 	current_price:0,
      // price_change_24h:0,
      // 	price_change_percentage_24h:0,
      // 	total_volume:0
    },
  ]);

  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    aboutMe: "",
    avatar: "",
  });

  const getData = myStore((state) => state.getData);
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    lastName: "",
    userEmail: "",
    userID: "",
    avatar: "",
    aboutMe: "",
  });
 
  const logoutHandler = () => {
    localStorage.removeItem("my-app-token");
    setAuthenticated(false);
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("my-app-token"));

    if (token !== null) {
      axios
        .get(`${process.env.REACT_APP_BE_URL}/users/authorize-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserName(response.data.firstName);
          setAuthenticated(true);
          setUserId(response.data.userId);
          setAvatar(response.data.avatar);
        })
        .catch((err) => {
          if (err.response.status === 401)
            localStorage.removeItem("my-app-token");
          console.log(err.message);
        });
    }
  }, [authenticated]);
  const [reviewText, setReviewText] = useState({
    text:"",
    avatar:"",
    firstName:"",
  });
  return (
    <div className="bg-animation">
      <StorContext.Provider
        value={{
          reviewText,
          setReviewText,
          counter,
          userId,
          avatar,
          userName,
          setAvatar,
          countSell,
          setCountSell,
          setCounter,
          profileData,
          setProfileData,
          wallet,
          setWallet,
          bankData,
          walletList,
          setWalletList,
          setBankData,
          selectedCrypt,
          setSelectedCrypt,
          logoutHandler,
          checkUserId,
          setCheckUserId,
          setUserData,
          newsData,
          userData,
          setAuthenticated,
          authenticated,
          coinsToSell,
          value,
          setValue,
          setCoinsToSell,
        }}
      >
        <Header />
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/trading-live" element={<TradingLive />} />
          <Route path="/about-us" element={<AboutUs />} />
          {authenticated ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          <Route path="/bank-data" element={<BankData />} />
          {/* <Route path="/bank-data" element={<SecuredRoutes></SecuredRoutes>} /> */}

          {<Route path="/login" element={<Login />} />}

          <Route path="/" element={<Home></Home>} />
          <Route path="*" element={<NotFound />} />

          {authenticated ? (
            <Route path="/add-bank" element={<CreateAccount />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          {authenticated ? (
            <Route path="/get-bank" element={<DisplayUserBalance />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          {authenticated ? (
            <Route path="/sell-coins" element={<CoinsToSell />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          {authenticated ? (
            <Route path="/my-wallet" element={<MyWallet />} />
          ) : (
            <Route path="*" element={<NotFound />} />
          )}
          <Route path="/coins" element={<CoinsBS />} />
        </Routes>

        <Footer />
      </StorContext.Provider>
    </div>
  );
}

export default App;
