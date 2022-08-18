import React from "react";
import { useState } from "react";
import CoinItem from "../components/CoinItem";
import Coin from "./Coin";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import "../styles/Coins.css";

function Coins(props) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = props.coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const coinMap = filteredCoins.map((coins) => {
    return (
      <Link to={`/coin/${coins.id}`} element={<Coin />} key={coins.id}>
        <CoinItem coins={coins} />
      </Link>
    );
  });


  return (
    <div>
      <Banner />
      <div className="container">
        <form>
          <input
            className="coin_input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
        <div>
          <div className="heading">
            <p>#</p>
            <p className="coin-name">Coin</p>
            <p>Price</p>
            <p>24h</p>
            <p className="hide-mobile">Volume</p>
            <p className="hide-mobile">Mkt Cap</p>
          </div>
          {coinMap}
        </div>
      </div>
    </div>
  );
}

export default Coins;
