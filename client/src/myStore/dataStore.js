
import {create} from "zustand";
import axios from "axios";
export const myStore= create((set)=>({
cryptos:[],
newsData:[],

error:false,
getData:async()=>{
  
    // const options1 = {
    //   method: 'GET',
    //   url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=333ad23a145a4832b2ca734696e3b06b',
    //   //url:"https://newsdata.io/api/1/crypto?apikey=pub_260065beaa4df95c2f842200733d53e9f2c3b"
    // };
    const options2 = {
      method: 'GET',
      url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
    };

    try {
      
        // const newsData = await axios.request(options1);
        const cryptos = await axios.request(options2);
        // console.log(cryptos);
        set({cryptos:cryptos.data, 
          // newsData:"newsData.data"
        })
    } catch (error) {
set({error:error.message})  
  }
  },
  
  
}))
