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
		<h1 className='cryptos-table'>CRYPTOS SPACE</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>symbol</th>
          <th>cryptos</th>
          <th className='th'>Price</th>
          <th >Change</th>
          <th className='th'>Change%</th>
        </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody>
       
     
		  {cryptos.map((data,i)=><CryptosCart  key={i}  data={data}/>)}

       </tbody></table></div>
<table className="container">
	<thead>
		<tr>
			
		</tr>
	</thead>
	
		</table></div>
      {/* <div className='reviews-card'></div> */}
   </>
    </div>
  )
}

export default CryptosList
