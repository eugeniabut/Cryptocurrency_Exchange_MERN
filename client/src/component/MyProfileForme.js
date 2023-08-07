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
    userData,
    selectedCrypt,
    bankData,
    authenticated,
  } = useContext(StorContext);
  console.log(selectedCrypt);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [checkUserId, setCheckUserId] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const submitImageHandler = (e) => {
    e.preventDefault();
  };
  const coinBSOffer = async (e) => {
    try {
    const data = {
      cryptos: e.target.name.cryptos,
      current_price: +e.target.name.current_price,
      price_change_percentage_24h: +e.target.name.price_change_24h,
      quantity: e.target.name.quantity,
    };
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/exchange/coin-offer`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      );
      console.log(response.data.message);
    } catch (err) {
      console.log(err.request.response);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("imageFile", image);

    axios
      .post(`${process.env.REACT_APP_BE_URL}/uploads`, data)
      .then((res) => {
        setImgUrl(res.data.url);
      })
      .catch((err) => console.log(err));
    const updateData = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      phone: e.target["phone"].value,
      aboutMe: e.target["aboutMe"].value,
      avatar: imgUrl,
    };
    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/users/update-profile/${userData.userID}`,
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
        
        console.log(res.data)})
      .catch((err) => console.log(err));
  };
  const getUser = async () => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/users/profile/${userData.userID}`, {
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
  }, [isEditing]);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const userIdHandler = (e) => {
    setCheckUserId(false);
    if (e.target["bankID"].value === bankData._id) navigate("/add-bank");
    // e.target.style.display="none"
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
                    <input type="submit" value="Upload" />
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
          <img src={profileData.avatar} alt="avatar" style={{ width: 200 }} />
        </div>
      </div>
      <div className="sectionThree identity ">
        {!checkUserId ? (
          <div className="col-md-6">
            <label>Verify your Identity:</label>
            <form
              className="submit-identity btn-primary"
              onSubmit={userIdHandler}
            >
              <input
                name="bankID"
                className="identity"
                type="text"
                placeholder="Enter your ID"
              />
              <button className="submit-identity btn-primary">Submit</button>
            </form>
            <p>
              {" "}
              <b>
                {" "}
                Do we need Passport ID Number in database? If ID is true, then
                show here bank data (navigate to DisplayUserBalance). Email and
                name can be from backend getUser, and other personal data just
                edited by user himself{" "}
              </b>
            </p>
          </div>
        ) : (
          <div className="coin-cart">
            {authenticated ? <BankData /> : ""}{" "}
            <div>
              <h3>your coins :</h3>
              {selectedCrypt.map((data, i) => {
                if (i > 0)
                  return (
                    <tr
                      style={{ backgroundColor: "goldenrod" }}
                      className="wallet-item"
                    >
                      <td>
                        <img
                          className="coin-img"
                          src={data.image}
                          alt={data.symbol}
                          style={{ width: 30, height: 30 }}
                        />{" "}
                      </td>
                      <td>{data.id}</td>
                      <td>{data.current_price}</td>
                      <td>x{data.quantity}</td>
                      <td style={{ color: "green" }}>
                        {data.price_change_24h}
                      </td>
                      <td>{data.price_change_percentage_24h}</td>
                      <td>{data.total_volume}</td>
                      <td>
                        <button
                          style={{ background: "red" }}
                          value={data
                          //   cryptos: data.cryptos,
                          //  current_price: data.current_price,
                          //  price_change_percentage_24h: data.price_change_percentage_24h,
                          //   quantity:data.quantity
                          }
                          className="btn"
                          onClick={coinBSOffer}
                        >
                          sale{" "}
                        </button>
                      </td>
                    </tr>
                  );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyProfileForme;
