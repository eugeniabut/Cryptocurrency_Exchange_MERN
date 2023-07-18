import React from 'react'
import "./cryptosCart.css"
function CryptosCart(props) {
  const {data}=props
  console.log(data);
  return (
   <> <div className='cryptos-card' >
      <div className='reviews-card'></div>
   </div></>
  
  )
}

export default CryptosCart

