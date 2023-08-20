import React, { useContext, useEffect, useState } from "react";
import StorContext from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faPen, faImage } from "@fortawesome/free-solid-svg-icons";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";

function MyProfileForme() {
  const { profileData, setProfileData, userId } = useContext(StorContext);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(profileData.avatar || "");
  const [editingField, setEditingField] = useState(null);

  const imageUploader = async () => {
    const data = new FormData();
    data.append("imageFile", image);
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/uploads`,
        data
      );
      setImgUrl(res.data.url);
      setProfileData((prevData) => ({
        ...prevData,
        avatar: res.data.url, 
      }));
      console.log(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updateData = {
      ...profileData,
      avatar: imgUrl,
    };
  
    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/users/update-profile/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = () => {
    imageUploader();
  };




  const renderEmailField = () => {
    return (
      <div>
        <p>
          {editingField === "email" ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="icon-edit"
                onClick={() => setEditingField(null)}
              />
              <input
                type="text"
                name="email"
                className="form-control"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </form>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="icon-edit"
                onClick={() => setEditingField("email")}
              />
              <strong>{profileData.email}</strong>
            </>
          )}
        </p>
      </div>
    );
  };

  const renderPhoneField = () => {
    return (
      <div>
        <p>
          {editingField === "phone" ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <FontAwesomeIcon
                icon={faPhone}
                className="icon-edit"
                onClick={() => setEditingField(null)}
              />
              <input
                type="text"
                name="phone"
                className="form-control"
                value={profileData.phone}
                onChange={handleInputChange}
              />
            </form>
          ) : (
            <>
              <FontAwesomeIcon
                icon={faPhone}
                className="icon-edit"
                onClick={() => setEditingField("phone")}
              />
              <strong>{profileData.phone}</strong>
            </>
          )}
        </p>
      </div>
    );
  };

  const renderAboutMeField = () => {
    return (
      <div>
        <p>
          {editingField === "aboutMe" ? (
            <form onSubmit={(e) => handleSubmit(e)}>
              <div>
                {" "}
                <FontAwesomeIcon
                  icon={faPen}
                  className="icon-edit"
                  onClick={() => setEditingField(null)}
                />{" "}
              </div>

              <textarea
                type="text"
                name="aboutMe"
                className="my-notes-text"
                value={profileData.aboutMe}
                onChange={handleInputChange}
              />
            </form>
          ) : (
            <>
              <div>
                <strong>{profileData.aboutMe}</strong>
              </div>

              <div>
                <FontAwesomeIcon
                  icon={faPen}
                  className="icon-edit"
                  onClick={() => setEditingField("aboutMe")}
                />
              </div>
            </>
          )}
        </p>
      </div>
    );
  };

  

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      );
      console.log("Response data:", response.data);
      const { firstName, lastName, email, phone, aboutMe, avatar } =
        response.data;
  
      console.log("Fetched profile data:", response.data);

      setImgUrl(avatar || "");

      console.log("Fetched profile data:", response.data);
  
      
  
      setProfileData({
        firstName,
        lastName,
        email,
        phone,
        aboutMe,
        avatar,
      
      });
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  return (
    <div className="card-container">
      <div className="card-internal-container">
        <div className="section-gold-card">
          <div className="profile-picture">
             <img src={profileData.avatar} alt="avatar" style={{ width: 200 }} />
            <label htmlFor="avatar-input">
              <FontAwesomeIcon
                icon={faImage}
                className="icon-edit"
              />
            </label>
            <input
              type="file"
              id="avatar-input"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <button onClick={handleImageSubmit}>Upload</button>
          </div>

          <div className="profile-data">
            <h3>
              {profileData.firstName} {profileData.lastName}
            </h3>
            {renderEmailField()}
            {renderPhoneField()}
          </div>
        </div>

        <div className="section-my-notes">
          <h4>My Notes</h4>
          {renderAboutMeField()}
        </div>
      </div>
    </div>
  );
}

export default MyProfileForme;