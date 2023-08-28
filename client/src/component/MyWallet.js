import React, { useContext, useEffect, useState } from "react";
import "./myWallet.css";
import StorContext from "../context";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function MyWallet() {
  const navigate=useNavigate()
  let sum = [];
  const [msgResponse, setMsgResponse] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [update, setUpdate] = useState(true);
  const [listUpdate, setListUpdate] = useState(true);

  const {
    walletList, 
    setWalletList,
    counter,
    setCounter,
    selectedCrypt,
    setSelectedCrypt,
    bankData,
    checkUserId,
    countSell
  } = useContext(StorContext);
  const getcoins = async () => {
    axios
      .get(`${process.env.REACT_APP_BE_URL}/exchange/get-allCoins`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("my-app-token")
          )}`,
        },
      })
      .then((res) => {
        setWalletList(res.data)
      })
      .catch((err) => console.log(err.message));
  };
  selectedCrypt.map((data,i) =>{if(i>0) return sum.push(data.current_price)});
  const total = sum.reduce((acc, cur) => acc + cur, 0);
  const deleteCoin =  (e,data) => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      setCounter(1);
    }
    console.log(e.target.name);
   const newSelectCr= selectedCrypt.filter((item)=>
  item.id!==e.target.name
    
  )
  setSelectedCrypt(newSelectCr);
  console.log(selectedCrypt);

    // axios
    //   .delete(
    //     `${process.env.REACT_APP_BE_URL}/exchange/delete-coin/${e.target.name}/${counter}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${JSON.parse(
    //           localStorage.getItem("my-app-token")
    //         )}`,
    //       },
    //     }
    //   )
      // .then((res) => {
      //   console.log(res.data);
        setUpdate(true);
        getcoins();
      // })
      // .catch((err) => console.log(err));
  };
  useEffect(() => {
    getcoins();
  }, [update]);

  const postCoins = async () => {
    for (let i = 0; i < selectedCrypt.length; i++) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BE_URL}/exchange/add-coin`,
          selectedCrypt[i],
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
        console.log(err.response.response);
      }
    }
  };

  const buyCryptos = async () => {
    console.log(bankData);
    const bankID = bankData[0]._id;
    console.log(bankData[0]._id);
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
      postCoins();
      setSelectedCrypt([{}]);
      navigate("/coins")
      setCounter(0)

    } catch (err) {
      setErrMsg(err.response.data);
    }
  };

  return (
    <div className="wallet-container">
      <div className="sidebar">
        <div className="link-list">
          <NavLink  style={{textDecoration: 'none'}} to="/bank-data" className="link-name">
            Your Bank
          </NavLink>
          <NavLink  style={{textDecoration: 'none'}}to="/sell-coins" className="link-name">
            Coins to sell{" "}
            
          </NavLink>
          <NavLink  style={{textDecoration: 'none'}}to="/coins" className="link-name">
            your wallet coins{" "}
            {!update ? (
              <FontAwesomeIcon icon={faBell} style={{ color: "#e81111" }} />
            ) : (
              ""
            )}
          </NavLink>
        </div>
      </div>
      <div className="wallet">
        {" "}
        {selectedCrypt.map((data, i) => {
          // sum.push(data.current_price);
          if (i > 0)
            return (
              <tr className="wallet-item">
                <td>
                  <img
                    className="coin-img"
                    src={data.image}
                    alt={data.symbol}
                    style={{ width: 30, height: 30 }}
                  />
                </td>
                <td>{data.cryptos}</td>
                <td>{data.current_price}</td>
                <td>{data.quantity}</td>
                <td style={{ color: "green" }}>{data.price_change_24h}</td>
                <td>{data.price_change_percentage_24h}</td>
                <td>{data.total_volume}</td>
                <td>
                  <button
                    style={{ background: "red" }}
                    name={data.id}
                    className="btn"
                    onClick={(e)=>deleteCoin(e,data)}
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
          <span>
            <p>Total price :</p>
          </span>
          <span className="some"> {selectedCrypt.length > 1 ? total : 0}€</span>
          {total > 0 ? (
            <span>
              {" "}
              {checkUserId ? (
                <button
                  style={{
                    width: "7rem",
                    height: "3rem",
                    padding: "0.5rem",
                    borderRadius: "10%",
                    background: "green",
                  }}
                  className="btn"
                  onClick={buyCryptos}
                >
                  <h4>confirm</h4>
                </button>
              ) : (
                <h4
                  style={{
                    width: "7rem",
                    height: "3rem",
                    padding: "0.5rem",
                    borderRadius: "10%",
                    background: "gray",
                  }}
                >
                  confirm
                </h4>
              )}
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default MyWallet;
