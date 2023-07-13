import React, { useState, useEffect } from "react";
import axios from "axios";

const BankData = () => {
  const [bankData, setBankData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/getData");
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
    <div>
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
              <th>Owner</th>
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
                <td>{data.owner.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BankData;