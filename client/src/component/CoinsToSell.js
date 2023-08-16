import React, { useContext, useState } from 'react'
import { NavLink, parsePath } from 'react-router-dom'
import "./coinToSell.css"
import StorContext from '../context'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
function CoinsToSell() {
  const {
    value,setValue,
    coinsToSell,
    setCoinsToSell,}= useContext(StorContext)

    const goToSell=(e)=>{
      const newVal=e.target.name
      setValue([...value,parsePath(newVal)])
    }
    console.log(value);
  return (
    <div className='coins-sell'>
        <div className="sidebar">
        <div className="link-list">
          <NavLink to="/bank-data" className="link-name">
            Your Bank
            {value.length>1?<FontAwesomeIcon icon={faBell} style={{color: "#e81111", width:40}} />:""}

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
     <div className='sell-container'><h3>Your Sell coins list :</h3>
     {coinsToSell?.map((data, i) => {
       
      if(i>1)
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
          <td>x{data.quantity}</td>
        
          <td>{data.current_price+(data.current_price* data.price_change_percentage_24h)}</td>
          <td>
            <button
              style={{ background: "red" }}
              name={data.current_price+(data.current_price* data.price_change_percentage_24h)}
              className="btn"
              onClick={(e)=>goToSell(e)}
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

export default CoinsToSell
