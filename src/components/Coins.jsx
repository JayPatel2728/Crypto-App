import React from 'react'
import CoinItem from './CoinItem'
import Coin from '../routes/Coin'
import { Link } from 'react-router-dom'
import '../styles/Coins.css'

function Coins(props) {
    const coinMap = props.coins.map(coins =>{
        return (
            <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id} >
                <CoinItem coins={coins}/>
            </Link>
        )
    })

  return (
    <div className='container'>
        <div>
            <div className='heading'>
                <p>#</p>
                <p className='coin-name'>Coin</p>
                <p>Price</p>
                <p>24h</p>
                <p className='hide-mobile'>Volume</p>
                <p className='hide-mobile'>Mkt Cap</p>
            </div>
            {coinMap}
        </div>
    </div>
  )
}

export default Coins