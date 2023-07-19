import React from 'react'
import "./cryptosCart.css"
function CryptosCart(props) {
  const {data}=props
//   console.log(data);
  return (
   <> <div className='cryptos-card' >

<table class="container">
	<thead>
		<tr>
			<th><h1>symbol</h1></th>
			<th><h1>cryptos</h1></th>
			<th><h1>current_price</h1></th>
			<th><h1>price_change_24h</h1></th>
			<th><h1>price_change_percentage_24h</h1></th>
			<th><h1>current_price</h1></th>
			<th><h1>total_volume</h1></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{data.symbol}</td>
			<td>{data.id}</td>
			<td>{data.current_price}</td>
			<td>{data.price_change_24h}</td>
			<td>{data.price_change_percentage_24h}</td>
			<td>{data.current_price}</td>
			<td>{data.total_volume}</td>
		</tr>
		
	</tbody></table></div>
      {/* <div className='reviews-card'></div> */}
   </>
  
  )
}

export default CryptosCart

