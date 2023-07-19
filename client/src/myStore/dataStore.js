import create from "zustand"
import axios from "axios";
export const myStore= create((set)=>({
data:[],
cryptosData:[],
error:false,
getNews:async()=>{
  
    const options = {
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=333ad23a145a4832b2ca734696e3b06b',
    };
  
    try {
        const response = await axios.request(options);
        set({data:response.data})
    } catch (error) {
set({error:error.message})  
  }
  },
  getCryptos:async()=>{  
  
    const options = {
      method: 'GET',
      url:'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
        //url:"https://newsdata.io/api/1/crypto?apikey=pub_260065beaa4df95c2f842200733d53e9f2c3b"
    };
  
    try {
        const response = await axios.request(options);
    set({cryptosData:response.data});
    } catch (error) {
        set({error:error.message})  
    }}
}))