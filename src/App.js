import { useEffect, useState } from "react";
import Coins from "./pages/CoinsPage";
import Navbar from "./components/Navbar";
import Coin from './pages/Coin'
import coinGecko from "./api/coinGecko";
import { Routes, Route } from 'react-router-dom'

function App() {
  const [coins, setCoins] = useState([]);
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"

  useEffect(() => {
    coinGecko.get(url, {
      mode: 'cors',
      credentials: 'include'
    })
      .then((response) => {
        setCoins(response.data)
      }).catch((error)=>{
        console.log(error)
      })
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>  
        <Route path='/' element={<Coins coins={coins}/>} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
