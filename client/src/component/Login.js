import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";
import StorContext from "../context/index.js"
function Login(props) {
  const {setUserData,setAuthenticated, authenticated}=useContext(StorContext)
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  useEffect(() => {
    if (authenticated) navigate("/");
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const userLogin = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/login`,
        userLogin
      );
      console.log(response.data);
      localStorage.setItem("my-app-token", JSON.stringify(response.data.token));
    setAuthenticated(true);
      setUserData({
        userName: response.data.firstName,
        lastName: response.data.lastName,
        userEmail: response.data.email,
        userID: response.data._id,
        avatar:response.data.avatar,
      aboutMe:response.data.aboutMe
      });

      navigate("/profile");
      
      e.target.reset();
    } catch (err) {
      setErrorMessage(err.request.response);
      console.log(err);
    }
  };
  return (
    <div className="login-form">
      <div>
        <h1>Log In</h1>
      </div>
      <div>
        <form className="login" onSubmit={submitHandler}>
          <input type="email" name="email" placeholder="E-mail" required />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />

          <nav>
            <input type="submit" value="login" />
          </nav>
          <></>
        </form>
        <div>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {responseMsg && <p style={{ color: "green" }}>{responseMsg}</p>}
        </div>
        <div>
          <p className="mb-3 text-sm">
            Need an Account? <br />
            <NavLink to="/register" className="link">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
