import './App.css';
import Registration from './component/Registration';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';
import Login from './component/Login';

function App() {
  return (
    <div >
     <Header/>
     <Registration/>
     <Login/>
     <Home/>
     <Footer/>
    </div>
  );
}

export default App;
