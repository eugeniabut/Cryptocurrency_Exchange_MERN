import React, { useContext, useEffect, useState } from 'react'
import StorContext from '../context';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import "./coinsBs.css"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function CoinsBS() {
  
  const {
    countSell,
    setCountSell,
    coinsToSell,
    setCoinsToSell,
    userId,
    selectedCrypt,
    bankData,
   walletList,
    setWalletList,
    authenticated,
  } = useContext(StorContext);
  const[on, setOn]=useState(false)
const coinBSOffer =  (e) => {
 
const coins=[]
console.log(e.target.name);
const coin=walletList.find((elem)=>elem._id===e.target.name)
coins.push(coin)
setCoinsToSell([...coinsToSell,coin])
setCountSell(coinsToSell.length)

};
  return (
    <div className='coins-wallet'>
       <div className="sidebar">
        <div className="link-list">
          <NavLink to="/bank-data" className="link-name">
            Your Bank
          </NavLink>
          <NavLink to="/sell-coins" className="link-name">
           Coins to sell{countSell > 0 ? (
              <>
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ color: "#e81111", width: 40 }}
                />
                <small style={{ color: "red" }}>{countSell}</small>
              </>
            ) : null}
          </NavLink>
          <NavLink to="/coins" className="link-name">
          your wallet coins 
          {/* {!update?<FontAwesomeIcon icon={faBell} style={{color: "#e81111",}} />:""} */}
          </NavLink>
        </div>
      </div>
 <div className='coins-container'>  <h3>your coins :</h3>
    {walletList?.map((data, i) => {
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
            <td>{data.cryptos}</td>
            <td>{data.current_price}</td>
            <td>x{data.quantity}</td>
            <td style={{ color: "green" }}>
            {	data.price_change_24h>0?(<td style={{color:"green"}} >{data.price_change_24h}</td>):(<td style={{color:"red"}} >{data.price_change_24h}</td>)}
            </td>
		{	data.price_change_percentage_24h>0?(<td style={{color:"green"}} >{data.price_change_percentage_24h}</td>):(<td style={{color:"red"}} >{data.price_change_percentage_24h}</td>)}%
            <td>{data.total_volume}</td>
            <td>
              <button
                style={{ background:on?"green":`red` }}
                name={data._id}
                className={on?"btn toGreen":"btn"}
                onClick={(e)=>{
                    setOn(true)
                  return coinBSOffer(e)}}
              >
                sell{" "}
              </button>
            </td>
          </tr>
        );
    })}</div>
  </div>
  )
}

export default CoinsBS
