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
  const[walletList,setWalletList]=useState([{}])
  const imageUploder=async()=>{

    const data = new FormData();
    data.append("imageFile", image);

    axios
      .post(`${process.env.REACT_APP_BE_URL}/uploads`, data)
      .then((res) => {
        setAvatar(res.data.url);
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
          email:userData.userEmail,
          phone: res.data.phone,
          aboutMe: res.data.aboutMe,
          avatar: avatar,
        });
      })
      .catch((err) => console.log(err));
  };



 useEffect(() => {
    getUser();
  }, [avatar,isEditing]);
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




































// import React, { useContext, useEffect, useState } from "react";
// import StorContext from "../context";
// import axios from "axios";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPhone, faEnvelope, faPen, faImage } from "@fortawesome/free-solid-svg-icons";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Profile.css";

// //file upload step 1.
// import FileBase from "react-file-base64"

// function MyProfileForme() {
//   const { profileData, setProfileData, userId } = useContext(StorContext);

//   const [editingField, setEditingField] = useState("");
//   const [file, setFile] = useState();
//   const [description, setDescription] = useState("");
//   const [avatarImage, setAvatarImage] = useState(null);

//   //create locale state. Step 2.
//   const [postData, setPostData] = useState({
//     avatar: ""
//   })


// //create a submit function. Step 3.

// const handelSubmitTemp = async (e)=>{
//   e.preventDefault();
//   //next post data to the Backend
  
// try {

//   const API = axios.create({ baseURL: "http://localhost:4000" });

//   API.interceptors.request.use((req) => {
//     if (localStorage.getItem("my-app-token")) {
//       req.headers.authorization = `Bearer ${
//         JSON.parse(localStorage.getItem("my-app-token"))
//       }`;
//     }
//     return req;
//   });

//   const result = await API.post(`/users/update-profile/${userId}`, postData)

//   getUser();
// } catch (error) {
//   console.log(error.message);
// }
// };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     console.log("File selected:", e.target.files[0]);
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updateData = {
//       ...profileData,
      
//     };

//     axios
//       .put(
//         `${process.env.REACT_APP_BE_URL}/users/update-profile/${userId}`,
//         updateData,
//         {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   };




//   useEffect(() => {
//     getUser();
//   }, []);

 
//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.REACT_APP_BE_URL}/users/profile/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${JSON.parse(localStorage.getItem("my-app-token"))}`,
//           },
//         }
//       );
//       const { firstName, lastName, email, phone, aboutMe, avatar } = response.data;
  
//       setAvatarImage(avatar); // Set the fetched avatar image
  
//       setProfileData({
//         firstName,
//         lastName,
//         email,
//         phone,
//         aboutMe,
//         avatar,
//       });
//     } catch (error) {
//       console.log("Error fetching user profile:", error);
//     }
//   };

//   const renderAvatarField = () => {
//     return (
//       <div>
//         <div className="profile-picture">
//           {avatarImage ? (
//             <img src={`data:image/png;base64,${avatarImage}`} alt="Avatar" />
//           ) : (
//             <p>No avatar image</p>
//           )}
//           <FileBase
//             type="file"
//             multiple={false}
//             onDone={({ base64 }) => setPostData({ ...postData, avatar: base64 })}
//           />
//           <button type="submit">Submit</button>
//         </div>
//       </div>
//     );
//   };

//   const renderEmailField = () => {
//     return (
//       <div>
//         <p>
//           {editingField === "email" ? (
//             <form onSubmit={(e) => handleSubmit(e)}>
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 className="icon-edit"
//                 onClick={() => setEditingField(null)}
//               />
//               <input
//                 type="text"
//                 name="email"
//                 className="form-control"
//                 value={profileData.email}
//                 onChange={handleInputChange}
//               />
//             </form>
//           ) : (
//             <>
//               <FontAwesomeIcon
//                 icon={faEnvelope}
//                 className="icon-edit"
//                 onClick={() => setEditingField("email")}
//               />
//               <strong>{profileData.email}</strong>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   };

//   const renderPhoneField = () => {
//     return (
//       <div>
//         <p>
//           {editingField === "phone" ? (
//             <form onSubmit={(e) => handleSubmit(e)}>
//               <FontAwesomeIcon
//                 icon={faPhone}
//                 className="icon-edit"
//                 onClick={() => setEditingField(null)}
//               />
//               <input
//                 type="text"
//                 name="phone"
//                 className="form-control"
//                 value={profileData.phone}
//                 onChange={handleInputChange}
//               />
//             </form>
//           ) : (
//             <>
//               <FontAwesomeIcon
//                 icon={faPhone}
//                 className="icon-edit"
//                 onClick={() => setEditingField("phone")}
//               />
//               <strong>{profileData.phone}</strong>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   };

//   const renderAboutMeField = () => {
//     return (
//       <div>
//         <p>
//           {editingField === "aboutMe" ? (
//             <form onSubmit={(e) => handleSubmit(e)}>
//               <div>
//                 {" "}
//                 <FontAwesomeIcon
//                   icon={faPen}
//                   className="icon-edit"
//                   onClick={() => setEditingField(null)}
//                 />{" "}
//               </div>

//               <textarea
//                 type="text"
//                 name="aboutMe"
//                 className="my-notes-text"
//                 value={profileData.aboutMe}
//                 onChange={handleInputChange}
//               />
//             </form>
//           ) : (
//             <>
//               <div>
//                 <strong>{profileData.aboutMe}</strong>
//               </div>

//               <div>
//                 <FontAwesomeIcon
//                   icon={faPen}
//                   className="icon-edit"
//                   onClick={() => setEditingField("aboutMe")}
//                 />
//               </div>
//             </>
//           )}
//         </p>
//       </div>
//     );
//   };

  

//   return (
//     <div className="card-container">
//       <div className="card-internal-container">
//         <div className="section-gold-card">
      
//           <div className="profile-picture">
//               {renderAvatarField()}
          
//           </div>

//           <div className="profile-data">
//             <h3>
//               {profileData.firstName} {profileData.lastName}
//             </h3>
//             {renderEmailField()}
//             {renderPhoneField()}
//           </div>
//         </div>

//         <div className="section-my-notes">
//           <h4>My Notes</h4>
//           {renderAboutMeField()}
//         </div>
//       </div>
//     </div>
//   );
//   }

// export default MyProfileForme;