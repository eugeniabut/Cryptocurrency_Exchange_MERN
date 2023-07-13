import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
   
    image: 'path/to/image.jpg',
    dateOfBirth:"DD-MM-YYYY",
    name: 'Edit your Name',
    email: 'Edit your password',
    phone: 'Edit your phone',
    country: 'Edit your profile',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform save logic or API request here
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
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
          <div className="profile-info">
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
        <div className="col-md-6">
         
            <label>Verify your Identity:</label>
           <input className='identity' type="text" 
           placeholder='Enter your ID'/>
          
          <button className='submit-identity btn-primary'>Submit</button>
          <p> <b> Do we need Passport ID Number in database?     If ID is true, then show here bank data (navigate to DisplayUserBalance). Email and name can be from backend getUser, and other personal data just edited by user himself </b></p></div>
      
      </div>
      <div className="row">
        <div className="col">
          {isEditing ? (
            <div>
              <label>
                Image:
                <input
                  type="text"
                  name="image"
                  value={profileData.image}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={profileData.country}
                  onChange={handleChange}
                  className="form-control"
                />
              </label>
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Save
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;