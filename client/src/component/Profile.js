import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


import axios from "axios";

import { NavLink } from "react-router-dom";

function Profile(props) {
  const { userData } = props;

  const [checkUserId, setCheckUserId] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    image: "path/to/image.jpg",
    dateOfBirth: "DD-MM-YYYY",
    name: "Edit your Name",
    email: "Edit your password",
    phone: "Edit your phone",
    country: "Edit your profile",
  });
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setProfileData({
      dateOfBirth: e.target["birthD"].value,
      name: e.target["name"].value,
      email: e.target["email"].value,
      phone: e.target["phone"].value,
      country: e.target["country"].value,
    });
  };
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
  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const submitImageHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("imageFile", image);

    axios
      .post("http://localhost:4000/uploads", data)
      .then((res) => {
        console.log(res.data.url);
        setImgUrl(res.data.url);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <main className="main">
      <div className="sidebar">
        <div className="link-list">
          <NavLink to="/home" className="link-name">
            Link
          </NavLink>
          <NavLink to="/about" className="link-name">
            Link
          </NavLink>
          <NavLink to="/contact" className="link-name">
            Link
          </NavLink>
        </div>
      </div>

      <div >
        <div className="card-content">
          <div className="card-heading">
            <div className="card-heading-photo-container">
              <div className="photo">
                <img src={imgUrl} alt="" />
              </div>
            </div>

            <div className="card-heading-photo-form">
              {isEditing ? (
                <form onSubmit={submitImageHandler}>
                  <input
                    type="file"
                    name="image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={imageChangeHandler}
                  />
                  <input type="submit" value="Upload" />
                </form>
              ) : (
                <div className="upload-icon" onClick={handleEditClick}>
                <FontAwesomeIcon icon={faCamera} />
              
              </div>
              )}
            </div>

            <div className="card-heading-links">
              <NavLink to="/home" className="link-name">
                Link
              </NavLink>
              <NavLink to="/about" className="link-name">
                ink2{" "}
              </NavLink>
              <NavLink to="/contact" className="link-name">
                Link3
              </NavLink>
            </div>
          </div>
          <div className="card-body">
            <div className="sectionOne profile-info">
              <h5>Personal data:</h5>
              <p>
                <b> Name:</b> {"use props or {profileData.name}"}
              </p>
              <p>
                {" "}
                <b>Date of Birth:</b>
              </p>
              <p>
                <b>Email:</b> {profileData.email}
              </p>
              <p>
                <b>Phone:</b> {profileData.phone}
              </p>

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
                        <label>
                          Date of Birth:
                          <input
                            type="text"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </label>
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

                      <button className="btn-edit" onClick={handleSaveClick}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <button className="btn-save" onClick={handleEditClick}>
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="sectionTwo">My current info</div>

            <div className="sectionThree identity ">
              <>
                <h5>Verify your Identity:</h5>
              </>
              <>
                <input
                  className="identity-input"
                  type="text"
                  placeholder="Enter your ID"
                />
              </>
              <>
                <button className="identity-submit ">Submit</button>
              </>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
