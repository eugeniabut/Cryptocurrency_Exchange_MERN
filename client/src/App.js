import './App.css';
import Registration from './component/Registration';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';
import { Route, Routes } from "react-router-dom";
import AboutUs from './component/AboutUs';
import TradingLive from './component/TradingLive';


function App() {
  return (
    <div >
     <Header/>
     <Routes>
        <Route
          path="/login"
          element={
            <Login
            />
          }
        />
        
        <Route path="/register" element={<Registration/>} />
        <Route path="/trading-live" element={<TradingLive/>} />
        <Route path="/about-us" element={<AboutUs/>} />
        {/* <Route path="/change-password" element={<ChangePassword />} /> */}
        {/* <Route
          path="/confirm-email/:token"
          element={
            <ConfirmEmail
              setAuthenticated={setAuthenticated}
              setUserName={setUserName}
              setUserId={setUserId}
            />
          }
        />
        <Route path="/password-reset/:email/:token" element={<PasswordRecovery />} /> */}
        {/* <Route path="/password-reset" element={<PasswordReset />} /> */}
        <Route path="/login" element={<Login/>} />

        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    
     <Footer/>
    </div>
  );
}

export default App;
