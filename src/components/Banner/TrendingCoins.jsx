import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from "react-router-dom"
import coinGecko from '../../api/coinGecko'
import "../../styles/Carousel.css"

function TrendingCoins() {
    const [trending, setTrending] = useState([])

    useEffect(()=>{
        const fetchTrendingCoinsData = async () =>{
            const trendingData = await coinGecko.get("/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h")
            setTrending(trendingData.data)
        }
        fetchTrendingCoinsData()
    }, [])

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
      
    const items = trending.map((coin)=> {
        let profit = coin?.price_change_percentage_24h >= 0;

        return(
            <Link className='carouselItem' to={`/coin/${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )
    })

    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };

  return (
    <div className='carousel-container'>
        <div className='carousel'>
            <AliceCarousel 
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    </div>
  )
}

export default TrendingCoins