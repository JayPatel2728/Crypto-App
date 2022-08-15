import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

function Coinitem(props) {
  return (
    <div className="coin-row">
      <p>{props.coins.market_cap_rank}</p>
      <div className="img-symbol add-width">
        <img src={props.coins.image} alt="" />
        <p>{props.coins.symbol.toUpperCase()}</p>
      </div>
      <p className="add-width">${props.coins.current_price.toLocaleString()}</p>
      <p
        className={props.coins.price_change_percentage_24h > 0 ? "pos" : "neg"}
      >
        <div className="arrow-icon"> 
            {props.coins.price_change_percentage_24h > 0 ? (
            <IoMdArrowDropup />
            ) : (
            <IoMdArrowDropdown />
            )}
        </div>
        {props.coins.price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="hide-mobile add-width">
        ${props.coins.total_volume.toLocaleString()}
      </p>
      <p className="hide-mobile add-width">${props.coins.market_cap.toLocaleString()}</p>
    </div>
  );
}

export default Coinitem;
