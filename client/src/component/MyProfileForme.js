import React, { useContext, useEffect, useState } from "react";
import StorContext from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BankData from "./DisplayUserBalance";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPen,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";

import "./myProfileForme.css";

function MyProfileForme() {
  const {
    profileData,
    setProfileData,
    avatar,
    setAvatar,
    userData,
    userId,
    selectedCrypt,
    bankData,
    authenticated,
  } = useContext(StorContext);

  const navigate = useNavigate();

  // const [imgUrl, setImgUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAboutMeEditing, setIsAboutMeEditing] = useState(false);
  // const [editProfileData, setEditProfileData] = useState({ ...profileData });
  // const [editAboutMe, setEditAboutMe] = useState(profileData.aboutMe);

  const imageUploader = async (imageUpdated) => {
    const data = new FormData();
    data.append("imageFile", imageUpdated);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BE_URL}/uploads`,
        data
      );
      const newAvatarUrl = res.data.url;

      // Update avatar in context
      setAvatar(newAvatarUrl);

      // Update avatar in profileData in context
      setProfileData({ ...profileData, avatar: newAvatarUrl });
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/users/update-profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      )
      .then((res) => {
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const handleAboutMeSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/users/update-profile/${userId}`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      )
      .then((res) => {
        setIsAboutMeEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const getUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BE_URL}/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      );
      setProfileData({
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        phone: res.data.phone,
        aboutMe: res.data.aboutMe,
        avatar: res.data.avatar ? res.data.avatar : avatar,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleProfileEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleAboutMeEditClick = () => {
    setIsAboutMeEditing(!isAboutMeEditing);
  };

  return (
    <div className="card-body">
      <div className="card-internal-container">
        <div className="section-gold-card">
          <div className="profile-picture">
            <img src={avatar} alt="avatar" />
          </div>

          <div className="profile-data">
            <div className="profile-logo">
              <img
                src={`${process.env.PUBLIC_URL}/crypto-space.png`}
                alt="Logo"
              />
            </div>
            <div>
            <h3>
              {profileData.firstName} {profileData.lastName}
            </h3>

            <p>
              <FontAwesomeIcon icon={faEnvelope} /> {profileData.email}
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> {profileData.phone}
            </p>
            </div>
          </div>
          {/* Profile Edit Form */}
          <div className="edit-field">
            {isEditing ? (
              <>
                <form className="profile-form" onSubmit={handleProfileFormSubmit}>
                
                    <label>
                      First Name:
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={profileData.firstName}
                        onChange={(e) => {
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          });
                        }}
                      />
                    </label>
                    <label>
                      Last Name:
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        value={profileData.lastName}
                        onChange={(e) => {
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          });
                        }}
                      />
                    </label>
                    <label>
                      Phone:
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        value={profileData.phone}
                        onChange={(e) => {
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          });
                        }}
                      />
                    </label>
                    <label>
                      Email:
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={profileData.email}
                        onChange={(e) => {
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          });
                        }}
                      />
                    </label>
              
                
                    <label>
                      {" "}
                      <input
                        className="input-choose-image"
                        type="file"
                        name="image"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        onChange={(e) => imageUploader(e.target.files[0])}
                      />
                    </label>
                       <div className="buttons-profile">
                    <button className="btn-save btn-profile btn-save-changes" type="submit">
                      Save Changes
                    </button>
                    <button
                      className="btn-close btn-profile"
                      onClick={handleProfileEditClick}
                    >
                      Close
                    </button>
                 </div>
                </form>
              </>
            ) : (
            
              <button className="icon-edit" onClick={handleProfileEditClick}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
          </div>
        </div>
        {/* About Me Edit Form */}
        <div className="section-my-notes">
          <h3> My Notes : </h3>
          {isAboutMeEditing ? (
            <form onSubmit={handleAboutMeSubmit}>
              <div className="textarea-before-editing">
                <textarea
                  name="aboutMe"
                  rows="7"
                  className="form-control textarea"
                  value={profileData.aboutMe}
                  onChange={(e) => {
                    setProfileData({ ...profileData, aboutMe: e.target.value });
                  }}
                ></textarea>
                <button className="btn-save btn-notes btn-notes-first" type="submit">
                  Save
                </button>
                <button
                  className="btn-close btn-notes"
                  onClick={handleAboutMeEditClick}
                >
                  Close 
                </button>
              </div>
            </form>
          ) : (
            <div className="textarea-editing">
              <h4 className="my-notes-text">{profileData.aboutMe}</h4>
              <button
                className="icon-edit-my-notes"
                onClick={handleAboutMeEditClick}
              >
                <FontAwesomeIcon icon={faPenNib} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfileForme;
