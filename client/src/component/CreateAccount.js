import React, { useContext, useState } from "react";
import axios from "axios";
import "./CreateAccount.css"
import { useNavigate } from "react-router-dom";
import StorContext from "../context";

const CreateAccount = () => {
  const navigate=useNavigate()
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
 const{userData,userId}=useContext(StorContext)
  
// const [transferAmount, setTransferAmount] = useState(0);
  // const [createdAt, setCreatedAt] = useState("");
  // const [owner, setOwner] = useState("");
console.log(userData);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
const bankData={
  accountNumber,
  accountHolder,

}
    try {
      const response = await axios.post(`${process.env.REACT_APP_BE_URL}/profile/add-bank`, bankData, {
        headers : {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
        }
      })
        console.log(response.data);
        navigate("/bank-data")
    
 
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="create-count">
      <h2>Create your account</h2>
      <form className="bank-form" onSubmit={handleFormSubmit}>
        <label>Account Number:</label>
        <input
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <label>Account Holder:</label>
        <input
          type="text"
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
        />

        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;