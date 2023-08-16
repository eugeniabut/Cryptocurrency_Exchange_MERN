import React, { useContext, useEffect, useState } from "react";
import StorContext from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BankData from "./DisplayUserBalance";
import "./Profile.css"

function MyProfileForme() {
  const {
    profileData,
    setProfileData,
    avatar,
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
  const[walletList,setWalletList]=useState([{}])
  const imageUploder=async()=>{

    const data = new FormData();
    data.append("imageFile", image);

    axios
      .post(`${process.env.REACT_APP_BE_URL}/uploads`, data)
      .then((res) => {
        setImgUrl(res.data.url);
        console.log(res.data.url);
            })
      .catch((err) => console.log(err));}
 
  const submitHandler = (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append("imageFile", image);

    // axios
    //   .post(`${process.env.REACT_APP_BE_URL}/uploads`, data)
    //   .then((res) => {
    //     setImgUrl(res.data.url);
    //   })
    //   .catch((err) => console.log(err));
    const updateData = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      phone: e.target["phone"].value,
      aboutMe: e.target["aboutMe"].value,
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
        setIsEditing(false)
        console.log(res.data)})
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
          phone: res.data.phone,
          aboutMe: res.data.aboutMe,
          avatar: res.data.avatar,
        });
      })
      .catch((err) => console.log(err));
  };



 useEffect(() => {
    getUser();
  }, [imgUrl,isEditing]);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="card-body">
      <div className="profile-data">
        <div className="sectionOne profile-info">
          <p>
            {" "}
            <b>Personal data:</b>{" "}
          </p>
          <p>
            <strong>firstName:</strong> {profileData.firstName}
          </p>
          <p>
            <strong>lastName:</strong> {profileData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.userEmail}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.phone}
          </p>

          <div className="row">
            <div className="col">
              {isEditing ? (
                <form onSubmit={submitHandler}>
                  <label>
                    firstName:
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder={profileData.firstName}
                    />
                  </label>
                  <label>
                    lastName:
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
                    about Me
                    <input
                      type="text"
                      name="aboutMe"
                      className="form-control"
                      placeholder={profileData.aboutMe}
                    />
                  </label>
                  <label>
                    {" "}
                    <input
                      type="file"
                      name="image"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <input type="button" value="Upload" onClick={imageUploder} />
                  </label>
                  <button className="btn btn-primary">Save</button>
                </form>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="sectionTwo">
          <h3>Hey {profileData.firstName}</h3>

          
          <h3> About ME : </h3>
          <h4>{profileData.aboutMe}</h4>
        </div>
        <div className="profile-picture">
          <img src={avatar} alt="avatar" style={{ width: 200 }} />
        </div>
      </div>
    
    </div>
  );
}

export default MyProfileForme;
