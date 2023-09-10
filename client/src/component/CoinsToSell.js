import React, { useContext, useState } from 'react'
import { NavLink, parsePath } from 'react-router-dom'
import "./coinToSell.css"
import StorContext from '../context'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
function CoinsToSell() {
  const {countSell,setCountSell,
    value,setValue,
    coinsToSell,
    setCoinsToSell}= useContext(StorContext)
const noSoldCoin=[]
setCountSell(0)
    const goToSell=(e,data)=>{
     
      // const newCoinsToSell=coinsToSell.filter((item)=>item.id!==data.id)
    const selctedCoin=coinsToSell.find((elem)=>{
if(elem._id===e.target.name){
  const multiplVal=(elem.current_price* elem.price_change_percentage_24h)
  const newVal=+elem.current_price+multiplVal
  setValue([...value,newVal])
}else{
noSoldCoin.push(elem)
}
    })
setCoinsToSell(noSoldCoin)

   console.log(noSoldCoin);
    }
   console.log(coinsToSell);
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
     <div className='sell-container'><h3>Pleas confirm our Sell  :</h3>
     <table className="container">
{/* 
     <thead>
		<tr>
			<th><h1>symbol</h1></th>
			<th><h1>cryptos</h1></th>
			<th className='th'><h1>current_price</h1></th>
			<th className='th'><h1>price_change_24h</h1></th>
			<th className='th'><h1>price_change_percentage_24h</h1></th>
			<th className='th'><h1>total_volume</h1></th>
		</tr>
	</thead> */}
     {coinsToSell?.map((data, i) => {
       console.log(coinsToSell);
      if(i>=1)
      return (
        <tr key={i}
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
        
          <td>{data.current_price+1}</td>
          <td>
            {/* {soldOut? */}
            <button
           
              style={{ background: "red" }}
            //  name={data.current_price+(data.current_price* data.price_change_percentage_24h)}
            name={data._id}
              className="btn"
              onClick={(e,data)=>goToSell(e,data)
              // removeItem(e,data)
              }
            >
              Confirm
            </button>
          </td>
        </tr>
      );
  })}</table></div>
     
    
    </div>
  )
}

export default CoinsToSell
