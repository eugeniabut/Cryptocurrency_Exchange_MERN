import React,{useContext} from 'react'
import "./cryptosCart.css"
import { myStore } from '../myStore/dataStore'
import { useState } from 'react';
import StorContext from "../context/index"
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function CryptosCart({data}) {
	// console.log(some);
	const{authenticated,counter,setCounter,selectedCrypt,setSelectedCrypt}=useContext(StorContext)
const addCoin=async	(e)=>{
	setCounter(counter+1)
				const coin={
					id:uuidv4(),
					cryptos:data.id,
					current_price:data.current_price,
				 price_change_24h:data.price_change_24h,
					price_change_percentage_24h:data.price_change_percentage_24h,
					total_volume:data.total_volume,
					image:data.image,
					quantity:1
				}
				
				setSelectedCrypt([...selectedCrypt,coin])
				// try {
				// 	const response = await axios.post(`${process.env.REACT_APP_BE_URL}/exchange/add-coin`,coin,{
				// 		headers : {
				// 		  'Authorization': `Bearer ${JSON.parse(localStorage.getItem('my-app-token'))}`
				// 		}
				// 	  })
				// 	  console.log( response.data.message);

					 
				//   } catch (err) {
				// 	console.log(err.request.response)
				
				//   }
				  
				}
				
				
  return (
   <>  <tr>
				 <img className='coin-img' src={data.image} alt={data.symbol} style={{width:30,height:30}}/>
          <td>{data.id} </td>
          <td>{data.current_price}</td>
		  {	data.price_change_24h>0?(<td style={{color:"green"}} >{data.price_change_24h}</td>):(<td style={{color:"red"}} >{data.price_change_24h}</td>)}
		  <td className='th'>{data.price_change_percentage_24h}</td>
		  {authenticated?<td><button className='Buy-now'  value={data} onClick={addCoin}  >Buy Now</button></td>:""}

		  </tr>
		{/* <tbody>
		<tr >
			<td>
				 <img className='coin-img' src={data.image} alt={data.symbol} style={{width:30,height:30}}/>
			</td> 
			<td>{data.id}</td>
			<td className='th'>{data.current_price}</td>
		{	data.price_change_24h>0?(<td style={{color:"green"}} >{data.price_change_24h}</td>):(<td style={{color:"red"}} >{data.price_change_24h}</td>)}
			<td className='th'>{data.price_change_percentage_24h}</td>
			<td className='th'>{data.current_price}</td>
			<td className='th'>{data.total_volume}</td>
			{authenticated?<td><button className='Buy-now'  value={data} onClick={addCoin}  >Buy Now</button></td>:""}
		</tr></tbody> */}
		
      {/* <div className='reviews-card'></div> */}
   </>
  
  )
}

export default CryptosCart

