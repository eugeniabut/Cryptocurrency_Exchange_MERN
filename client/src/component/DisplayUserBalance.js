import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./displayUserBalance.css"
import StorContext from "../context";
import { useNavigate } from "react-router-dom";

const BankData = () => {
  const navigate=useNavigate()
 const{bankData, authenticated,setBankData}=useContext(StorContext)
  const [isLoading, setIsLoading] = useState(true);
// console.log(bankData);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`${process.env.REACT_APP_BE_URL}/profile/bank-data`,{
          headers : {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
          }
        });
        

        setBankData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container">
      <h2>Bank Data</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Balance</th>
              <th>Transfer Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {bankData.map((data) => (
              <tr key={data._id}>
                <td>{data.accountNumber}</td>
                <td>{data.accountHolder}</td>
                <td>{data.balance}</td>
                <td>{data.transferAmount}</td>
                <td>{data.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BankData;