import React,{useState} from 'react'
import axios from "axios"
import "./regitration.css"
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from "react-router-dom";
function Registration() {
  const [errorMessage, setErrorMessage] = useState("")
  const [responseMsg,setResponseMsg]=useState("")
const navigate=useNavigate()
const onchangeHandler=(e)=>{
console.log(e.target.value);
}
const submitHandler=async(e)=>{
  e.preventDefault();
  const userProfile = {
    firstName: e.target["firstName"].value,
    lastName: e.target["lastName"].value,
    password: e.target["password"].value,
    confirmPassword: e.target["confirmPassword"].value,
    email: e.target["email"].value,
    address:{
    streetName: e.target["streetName"].value,
    cityName: e.target["cityName"].value,
    postalCode: e.target["postalCode"].value,
    houseNumber: e.target["houseNumber"].value
    
    }  }
console.log(userProfile);
  try {
    const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/create-user`, userProfile)
      e.target.reset()
      console.log( response);
      // navigate("/login")
      setResponseMsg(response.data.message)
  } catch (err) {
    setErrorMessage(err.request.response)

  }
}
  return (
    <div className='main-registration'>

        <MDBContainer fluid>

      <MDBCard className='text-black m-5 registration' style={{borderRadius: '25px',backgroundColor: "transparent"}}>
        <MDBCardBody  style={{backgroundColor: "transparent"}} className='registration' >
          <MDBRow className='body-registration'>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"><h3>Sign up</h3></p>
              <form  onSubmit={submitHandler} encType="multipart/form-data">

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' 
          name="firstName"
          placeholder="First Name" className='w-100'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput label='Your Name' id='form1' type='text' 
          name="lastName"
          placeholder="Last Name" className='w-100'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Email'  name="email"
          placeholder="Email"
          required id='form2' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='Password'  name="password"
          placeholder="Password"
          required id='form3' type='password'/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput label='confirmPassword'  name="confirmPassword"
          placeholder="Confirm Password"
          required id='form3' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Street Name' id='form4'  type="text"
          name="streetName"
          placeholder="Street Name"
          required/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='City Name' id='form4'  type="text"
          name="cityName"
          placeholder="City Name"
          required/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='House No.' id='form4'    type="number"
          name="houseNumber"
          placeholder="House No."
          required/>
              </div>
              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg'/>
                <MDBInput label='Post code' id='form4'    type="number"
          name="postalCode"
          placeholder="Post code"
          required/>
              </div>
              {/* <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div> */}
              <select size='lg' onChange={onchangeHandler} name="country">
            <option selected="" value="Default">(Please select a country)</option>
            <option defaultValue="AF">Australia</option>
            <option defaultValue="AL">Canada</option>
            <option defaultValue="DZ">India</option>
            <option defaultValue="AS">Russia</option>
            <option defaultValue="AD">USA</option>
          </select>
              <MDBBtn style={{backgroundColor:'rgb(212, 159, 25)',height:"3rem",width:"14.5rem"}} >Register</MDBBtn>
              </form>
           
            <div>{
        errorMessage 
          && <p style={{color:'red'}}>{errorMessage}</p>      
      }{  responseMsg 
        && <p style={{color:'green'}}>{responseMsg}</p> }</div>
     <div> <p size='lg'className="mb-3 text-sm" >
        Already have  an account? <br />
        <NavLink to="/login" style={{color:'green'}} size='lg' ><h4>Log in</h4></NavLink> 

     </p>  
     </div>  </MDBCol>
            <MDBCol md='10' lg='5' className='order-2 order-lg-2 d-flex align-items-center registr-img'>
              <MDBCardImage src='https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?size=626&ext=jpg' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    
    </MDBContainer> </div>
     
  )
}

export default Registration
