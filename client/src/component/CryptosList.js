import React, { useContext, useState } from 'react'
import CryptosCart from './CryptosCart'
import { myStore } from '../myStore/dataStore'
import "./cryptosList.css"
import StorContext from '../context'
function CryptosList() {
	const{authenticated}=useContext(StorContext)
    const cryptos=myStore((state)=>state.cryptos)

  return (
    <div>
        <> <div className='cryptos-list' >

<table className="container">
	<thead>
		<tr>
			<th><h1>symbol</h1></th>
			<th><h1>cryptos</h1></th>
			<th className='th'><h1>current_price</h1></th>
			<th className='th'><h1>price_change_24h</h1></th>
			<th className='th'><h1>price_change_percentage_24h</h1></th>
			<th className='th'><h1>current_price</h1></th>
			<th className='th'><h1>total_volume</h1></th>
			{authenticated ?<th ><h1>To Buy</h1></th>:""}
		</tr>
	</thead>
	
	{cryptos.map((data,i)=><CryptosCart  key={i}  data={data}/>)}
		</table></div>
      {/* <div className='reviews-card'></div> */}
   </>
    </div>
  )
}

export default CryptosList
