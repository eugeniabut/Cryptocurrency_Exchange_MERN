import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./displayUserBalance.css"
import StorContext from "../context";
import { useNavigate } from "react-router-dom";
import CreateAccount from "./CreateAccount";

import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from'@fortawesome/free-solid-svg-icons'

const BankData = () => {
  const navigate=useNavigate()
 const{bankData,checkUserId,value,userId,  setCheckUserId,setBankData}=useContext(StorContext)
  const [isLoading, setIsLoading] = useState(true);
console.log(bankData);
const userIdHandler = (e) => {
  setCheckUserId(true);
  if (e.target["bankID"].value ===userId ) navigate("/add-bank");
  // e.target.style.display="none"
};
console.log(value);
  useEffect(() => {
    const fetchData = async () => {
      try {
      // const response= await axios.get(`${process.env.REACT_APP_BE_URL}/profile/user-bank/${userId}`,{
      //   headers : {
      //     'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
      //   }
      // });
      

        const response = await axios.get(`${process.env.REACT_APP_BE_URL}/profile/user-bank`,{
          headers : {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
          }
        });
        
console.log(response);
        setBankData(response.data);
        setIsLoading(false);
        console.log(bankData);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (<div className="bank-container">
   
   <div className="sidebar">
        <div className="link-list">
          <NavLink to="/bank-data" className="link-name">
            Your Bank
          </NavLink>
          <NavLink to="/sell-coins" className="link-name">
           Coins to sell
            {/* {counter>1?<><FontAwesomeIcon icon={faBell} style={{color: "#e81111", width:40}} /><small style={{color:"red"}}>{counter}</small></> :null} */}
          </NavLink>
          <NavLink to="/coins" className="link-name">
          your wallet coins 
          {/* {!update?<FontAwesomeIcon icon={faBell} style={{color: "#e81111",}} />:""} */}
          </NavLink>
        </div>
      </div>
    <div className="container-balance">
     
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
        ) : (bankData!==null?
          <div className="coin-cart">
            {/* {authenticated ? <BankData /> : ""}{" "} */}
            
       {value.length>1?<p style={{color:"green"}}>your bank balance has been increased</p>:""}
      <h2>Bank Data</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Account Number</th>
              <th>Account Holder </th>
              <th>Balance €</th>
              <th>Transfer Amount €</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody className="tbody">
          
              <tr key={bankData._id} >
  <td style={{color:"white"}}>{bankData.accountNumber}</td>
<td style={{color:"green"}}>{bankData.accountHolder}</td>
  <td style={{color:"green"}}>{bankData.balance}</td>
  <td style={{color:"red"}}>{bankData.transferAmount}</td>
  <td style={{color:"white"}}>{bankData.createdAt}</td>
</tr>
{value.length>0?value.map((data,i) => {
  console.log(data);
  if(i>1)
  {return(
  <tr key={i}>
    <td></td>
  <td ></td>
    <td style={{color:"green"}}>+{bankData.balance+data}</td>
    <td style={{color:"green"}}>+{data}</td>
    {/* (parseFloat(data).toFixed(2)) */}
    {/* <td>{new Date()}</td> */}
  </tr>)}}):""}
          </tbody>
        </table>
      )}   </div>:(<CreateAccount/>))}
    </div>
    </div></div>
  );
};

export default BankData;