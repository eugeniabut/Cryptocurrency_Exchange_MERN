import React,{useState,useEffect} from 'react'
import axios from "axios"
import "./login.css"
import { NavLink, useNavigate } from 'react-router-dom';
function Login(props) {
  const navigate = useNavigate();
  const{setAuthenticated,setUserData,authenticated}=props
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  useEffect(()=>{
    if(authenticated) navigate("/")
  })

  const submitHandler = async (e) => {
    e.preventDefault();
    const userLogin = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/login`,
        userLogin
      );
      console.log(response.data);
    localStorage.setItem("my-app-token", JSON.stringify(response.data.token))
    setAuthenticated(true)
    setUserData({ userName:response.data.firstName,
      lastName:response.data.lastName,
      userEmail:response.data.email,
    userID:response.data._id})
    
      navigate("/profile")
      e.target.reset();

    } catch (err) {
     setErrorMessage(err.request.response);
      console.log(err);
    }
  };
  return (
    <div className='login-form'>
      <div><h1 >Log In</h1></div>
      <div><form onSubmit={submitHandler} >
        <input
          type="email"
          name="email"
          placeholder="E-mail" required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <input type="submit" value="Log In" />
      </form>{" "}</div>
      <div>{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {responseMsg && <p style={{ color: "green" }}>{responseMsg}</p>}</div>
      <div><p className="mb-3 text-sm">
        Need an Account? <br />
        <NavLink to="/register" className="link">
          Register
        </NavLink>
      </p></div>
    </div>
  );
}

export default Login
