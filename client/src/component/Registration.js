import React,{useState} from 'react'
import axios from "axios"
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
    <div className=''>
<div className='registration-text'><h1>Registration Form</h1></div>
<div className='from'>
  <form  onSubmit={submitHandler} encType="multipart/form-data">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
        />
        <input  
          type="text"
          name="lastName"
          placeholder="Last Name"
        />

        <input 
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
         
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input    
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
        />
      <input 
          type="text"
          name="streetName"
          placeholder="Street Name"
          required
        />
        <input 
          type="text"
          name="cityName"
          placeholder="City Name"
          required
        />
        <input 
          type="number"
          name="houseNumber"
          placeholder="House No."
          required
        />
        <input 
          type="number"
          name="postalCode"
          placeholder="Post code"
          required
        />
        <select onChange={onchangeHandler} name="country">
            <option selected="" value="Default">(Please select a country)</option>
            <option defaultValue="AF">Australia</option>
            <option defaultValue="AL">Canada</option>
            <option defaultValue="DZ">India</option>
            <option defaultValue="AS">Russia</option>
            <option defaultValue="AD">USA</option>
          </select>
        <input type="submit" value="Register" />
      </form>
      <div>{
        errorMessage 
          && <p style={{color:'red'}}>{errorMessage}</p>      
      }{  responseMsg 
        && <p style={{color:'green'}}>{responseMsg}</p> }</div>
     <div> <p className="mb-3 text-sm" >
        Already have  an account? <br />
        <NavLink to="/login" className="link" >Log in</NavLink> 

     </p>  
     </div>  </div>
      </div>
  )
}

export default Registration
