import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import BankData from "./DisplayUserBalance"

function Profile(props) {
  const {userData}=props
  const navigate=useNavigate()
  const [checkUserId,setCheckUserId]=useState(true)
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    image: 'path/to/image.jpg',
    dateOfBirth:"DD-MM-YYYY",
    name:userData.lastName,
    email:userData. userEmail,
    phone: 'Edit your phone',
    country: 'Edit your profile',
  });
const submitHandler =(e)=>{
  e.preventDefault();
  setProfileData({image: e.target["image"].value,
  dateOfBirth:e.target["birthD"].value,
  name: e.target["name"].value,
  email: e.target["email"].value,
  phone: e.target["phone"].value,
  country:e.target["country"].value,})

}
  const handleEditClick = () => {
    setIsEditing(true);
  };

const userIdHandler=(e)=>{
  setCheckUserId(false)
if(e.target["userID"].value===userData.userID) navigate("/add-bank")
// e.target.style.display="none"
 
}
 
  return (<div className='profile-global'>
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <div className="profile-image-container">
  <img
    src="https://g.foolcdn.com/image/?url=https%3A//g.foolcdn.com/editorial/images/647879/bitcoin-logo.jpg&w=2000&op=resize"
    alt="Profile"
    className="profile-image"
  />
</div>
          <div className="profile-info"  >
           <p> <b>Personal data:</b> </p>
            <p>
              <strong>Name:</strong> {profileData.name}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profileData.dateOfBirth}
            </p>
            
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Phone:</strong> {profileData.phone}
            </p>
            <p>
              <strong>Country:</strong> {profileData.country}
            </p>
          </div>
        </div>
      { checkUserId?( <div className="col-md-6"   >
            <label>Verify your Identity:</label>
            <form  className='submit-identity btn-primary' onSubmit={userIdHandler}>
           <input name='userID' className='identity' type="text" 
           placeholder='Enter your ID'/>
          
          <button  className='submit-identity btn-primary'>Submit</button>
            </form>
          <p> <b> Do we need Passport ID Number in database?     If ID is true, then show here bank data (navigate to DisplayUserBalance). Email and name can be from backend getUser, and other personal data just edited by user himself </b></p></div>
        
     
       ):
          (<BankData/>)}  </div> 
      <div className="row">
        <div className="col">
          {isEditing ? (
            <form onSubmit={submitHandler}>
              <label>
                Image:
                <input
                  type="text"
                  name="image"
                  className="form-control"
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  className="form-control"
                />
              </label>
               <label>
                date of birth:
                <input
                  type="text"
                  name="birthD"
                  className="form-control"
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  className="form-control"
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  className="form-control"
                />
              </label>
              <button className="btn btn-primary" >
                Save
              </button>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div></div>
  );
}

export default Profile;