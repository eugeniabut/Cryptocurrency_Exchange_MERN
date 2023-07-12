import React,{useEffect,useState} from 'react'
import axios from "axios"
import {useNavigate,NavLink} from "react-router-dom"
function Registration() {

   
  const [errorMessage, setErrorMessage] = useState("")

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);

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
      
      }   
    }
    try{
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/users/create-user`, userProfile)
      e.target.reset()
      navigate("/login")
    }
    catch(err){
      setErrorMessage(err.request.response)
    }
  } 
  return (
    <div>
<h1>Registration Form</h1>
Use tab keys to move from one input field to the next.
<form onSubmit={submitHandler}>
<ul>
<li><label for="firstName">firstName:</label></li>
<li><input type="text" name="firstName" size="50" /></li>
<li><label for="lastName">lastName:</label></li>
<li><input type="text" name="lastName" size="50" /></li>
<li><label for="passId">Password:</label></li>
<li><input type="password" name="password" size="12" /></li>

<li><label for="passId">confirmPassword:</label></li>
<li><input type="password" name="confirmPassword" size="12" /></li>
<li><label for="address">Address:</label></li>
<li><input 
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
        /><label for="country">Country:</label>
        <select name="country">
        <option selected="" value="Default">(Please select a country)</option>
        <option value="AF">Australia</option>
        <option value="AL">Canada</option>
        <option value="DZ">India</option>
        <option value="AS">Russia</option>
        <option value="AD">USA</option>
        </select></li>
<li><label for="email">email:</label></li>
<li><input type="text" name="email" size="50" /></li>

<li><label for="email">Email:</label></li>
<li><input type="text" name="email" size="50" /></li>
<li><label id="gender">Sex:</label></li>
<li><input type="radio" name="msex" value="Male" /><span>Male</span></li>
<li><input type="radio" name="fsex" value="Female" /><span>Female</span></li>
<li><label>Language:</label></li>
<li><input type="checkbox" name="en" value="en" checked /><span>English</span></li>
<li><input type="checkbox" name="nonen" value="noen" /><span>Non English</span></li>
<li><input type="submit" name="submit" value="Submit" /></li>
</ul>
</form>  
        {errorMessage 
          && <p style={{color:'red'}}>{errorMessage}</p>          
        }
      
        Already have  an account? <br />
        <NavLink to="/login"  >Log in</NavLink>  </div>
  )
}

export default Registration
