import React, { useContext, useEffect, useState } from "react";
import StorContext from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BankData from "./DisplayUserBalance";
import "bootstrap/dist/css/bootstrap.min.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faPen } from "@fortawesome/free-solid-svg-icons";

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
  console.log(selectedCrypt);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [walletList, setWalletList] = useState([{}]);
  const imageUploder = async () => {
    const data = new FormData();
    data.append("imageFile", image);

    axios
      .post(`${process.env.REACT_APP_BE_URL}/uploads`, data)
      .then((res) => {
        setAvatar(res.data.url);
        console.log(res.data.url);
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const updateData = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      phone: e.target["phone"].value,
      aboutMe: e.target["aboutMe"].value,
      avatar: avatar,
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
        setIsEditing(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getUser = async () => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/users/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("my-app-token")
          )}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setProfileData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: userData.userEmail,
          phone: res.data.phone,
          aboutMe: res.data.aboutMe,
          avatar: avatar,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUser();
  }, [avatar, isEditing]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="card-body">
      <div className="card-internal-container">
        <div className="section-gold-card">
          <div className="profile-picture">
            <img src={avatar} alt="avatar" />
          </div>

          <div className="profile-data">
            <h3>
              <strong></strong> {profileData.firstName} {profileData.lastName}
            </h3>

            <p>
              <FontAwesomeIcon icon={faEnvelope} /> {userData.userEmail}
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} /> {profileData.phone}
            </p>
          </div>

          <div className="edit-field">
            {isEditing ? (
              <form onSubmit={submitHandler}>
                <div className="edit-left">
                  <label>
                    First Name:
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder={profileData.firstName}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder={profileData.lastName}
                    />
                  </label>

                  <label>
                    Phone:
                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      placeholder={profileData.phone}
                    />
                  </label>

                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder={profileData.email}
                    />
                  </label>
                </div>
                
                <div className="edit-right">
                <label>
                  My Notes:
                  <textarea
                    name="aboutMe"
                    rows="4"
                    className="form-control"
                    placeholder={profileData.aboutMe}
                  ></textarea>
                </label>
                <label>
                  {" "}
                  <input
                    className="input-choose-image"
                    type="file"
                    name="image"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <button className="btn-upload " onClick={imageUploder}>
                    {" "}
                    Upload Image
                  </button>
                </label>
                <button className="btn-save">Save</button>
                </div>
              </form>
              
            ) : (
              <button className="icon-edit" onClick={handleEditClick}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            )}
          </div>
        </div>
        <div className="section-my-notes">
          <h3> My Notes : </h3>
          <h4 className="my-notes-text">{profileData.aboutMe}</h4>
        </div>
      </div>
    </div>
  );
}

export default MyProfileForme;
