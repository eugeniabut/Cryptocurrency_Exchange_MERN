import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import StorContext from "../context/index.js"
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';
function Login(props) {
  const {setUserData,setAuthenticated, authenticated}=useContext(StorContext)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  useEffect(() => {
    if (authenticated) navigate("/");
  });

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
      localStorage.setItem("my-app-token", JSON.stringify(response.data.token));
    setAuthenticated(true);
      setUserData({
        userName: response.data.firstName,
        lastName: response.data.lastName,
        userEmail: response.data.email,
        userID: response.data._id,
        avatar:response.data.avatar,
        aboutMe:response.data.aboutMe
      });

      navigate("/profile");
      
      e.target.reset();
    } catch (err) {
      setErrorMessage(err.request.response);
      console.log(err);
    }
  };
  return (
    <div className="login-form">
         <MDBContainer className="my-2">

{/* <MDBCard style={{backgroundColor: "transparent"}}> */}
  <MDBRow  className='g-0'>

    <MDBCol md='6'>
      <MDBCardImage src="https://atlas-content-cdn.pixelsquid.com/stock-images/account-avatar-gold-head-4o7K463-600.jpg" alt="login form" style={{height:400}} className='rounded-start w-100'/>
    </MDBCol>

    <MDBCol md='6'>
      <MDBCardBody style={{backgroundColor: "rgba(191, 161, 86, 0.216)"}} className='d-flex flex-column'>

        <div className='d-flex flex-row mt-2'>
          <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: 'rgb(164, 133, 54)' }}/>
          <span className="h1 fw-bold mb-0">Logo</span>
        </div>

        <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
        <form className="login" style={{height:300}}  onSubmit={submitHandler}>

          <MDBInput wrapperClass='mb-4' name="email" placeholder="E-mail" required label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg'   type="password"
            name="password"
            placeholder="Password"
            required  size="lg"/>
         
        <MDBBtn className="mb-4 px-5"  type="submit" value="login" color='dark' size='lg'>Login</MDBBtn>
        </form>
        <a className="small text-muted" href="#!">Forgot password?</a>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {responseMsg && <p style={{ color: "green" }}>{responseMsg}</p>}
        <p className="mb-5 pb-lg-2" style={{color: 'rgb(164, 133, 54)'}}>Don't have an account?  <br />
            <NavLink style={{color: 'rgb(800, 80, 84)'}} to="/register" >
              Register
            </NavLink></p>

        <div className='d-flex flex-row justify-content-start'>

        </div>

      </MDBCardBody>
    </MDBCol>

  </MDBRow>
{/* </MDBCard> */}

</MDBContainer>
     
    </div>
  );
}

export default Login;
