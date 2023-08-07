import React, { useContext, useEffect, useState } from "react";
import "./myWallet.css";
import StorContext from "../context";
import axios from "axios";
function MyWallet() {
  let sum = [];
  const [msgResponse, setMsgResponse] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const[apdat,setApdat]=useState(true)
  const[walletList,setWalletList]=useState([{}])
  const {
    counter,setCounter,
    selectedCrypt,
    setSelectedCrypt,
    bankData,
    setBankData,
  } = useContext(StorContext);
  const getcoins=async()=>{
    axios.get(`${process.env.REACT_APP_BE_URL}/exchange/get-allCoins`,{
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("my-app-token")
          )}`,
        },
      }).then((res)=>{
        setWalletList(res.data)
        setSelectedCrypt(res.data)
       }).catch((err) => console.log(err.message));
}
console.log("before",counter);
selectedCrypt.map((data,) => sum.push(+data.current_price));
const total = sum.reduce((acc, cur) => acc + cur, 0);
const deleteCoin=async(e)=>{
if (counter>1){setCounter(counter-1)}else{setCounter(1)}
console.log("after",counter);
  axios.delete(`${process.env.REACT_APP_BE_URL}/exchange/delete-coin/${e.target.name}/${counter}`,{
    headers: {
      Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("my-app-token")
      )}`,
    },
  }).then(res=>{
  console.log(res.data)
setApdat(true)
getcoins()

}).catch(err=>console.log(err))
}
useEffect(()=>{
  getcoins()

},[apdat])
  const buyCryptos = async () => {
    const bankID = bankData[0]._id;
    // console.log(bankData[0]._id);
    try {
      const balancData = { total, bankID };
      const response = await axios.put(
        `${process.env.REACT_APP_BE_URL}/exchange/buy-cryptos`,
        balancData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("my-app-token")
            )}`,
          },
        }
      );

      setMsgResponse(response.data.message);

    setWalletList([{}]);
    } catch (err) {
      setErrMsg(err.response.data);
    }
    console.log(walletList);

  };
  return (
    <div className="wallet">
      {" "}
      {walletList.map((data, i) => {
      // sum.push(data.current_price);
        if (i>0)
          return (
            <tr  className="wallet-item">
              <td>
                <img
                  className="coin-img"
                  src={data.image}
                  alt={data.symbol}
                  style={{ width: 30, height: 30 }}
                />
              </td>
              <td>{data.id}</td>
              <td>{data.current_price}</td>
              <td>{data.quantity}</td>
              <td style={{ color: "green" }}>{data.price_change_24h}</td>
              <td>{data.price_change_percentage_24h}</td>
              <td>{data.total_volume}</td>
              <td>
                <button
                  style={{ background: "red" }}
                  name={data._id}
                  className="btn"
                  onClick={deleteCoin}
                >
                  Remove{" "}
                </button>
              </td>
            </tr>
          );
      })}
      {msgResponse && <span style={{ color: "green" }}>{msgResponse}</span>}
      {errMsg && <span style={{ color: "red" }}>{errMsg}</span>}
      <div className="total-cart">
        Total price :{" "}
        <span className="some"> {walletList.length>1? total:0}€</span>
       { !sum<=0?<button
          style={{ background: "green" }}
          className="btn"
        onClick={buyCryptos}
        >
          Buy Now
        </button>:""}
      </div>
   </div>
  );
}

export default MyWallet;
