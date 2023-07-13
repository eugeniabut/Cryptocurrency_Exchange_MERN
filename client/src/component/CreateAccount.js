import React, { useState } from "react";
import axios from "axios";
import "./CreateAccount.css"

const CreateAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [balance, setBalance] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [createdAt, setCreatedAt] = useState("");
  const [owner, setOwner] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/profile/add-bank", {
        accountNumber,
        accountHolder,
        balance,
        transferAmount,
        createdAt,
        owner,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Create your account</h2>
      <form onSubmit={handleFormSubmit}>
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

        <label>Balance:</label>
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />

        <label>Transfer Amount:</label>
        <input
          type="number"
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
        />

        <label>Created At:</label>
        <input
          type="text"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />

        <label>Owner:</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;