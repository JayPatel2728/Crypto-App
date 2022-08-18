import React from 'react'
import TrendingCoins from './TrendingCoins'
import "../../styles/Banner.css"

function Banner() {
  return (
    <div className='banner'>
        <div className='banner-items'>
            <div className='trending-symbol'>Crypto Tracker</div>
            <div className='trending-slogan'>Get All The Info Regarding Your Favorite Crypto Currency</div>
            <TrendingCoins/>
        </div>
    </div>
  )
}

export default Banner