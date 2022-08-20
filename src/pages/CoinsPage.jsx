import React from "react";
import { useState } from "react";
import CoinItem from "../components/CoinItem";
import Coin from "./Coin";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@mui/material/Pagination";
import "../styles/Coins.css";

function Coins(props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const useStyles = makeStyles({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
        fontSize: '20px'
      },
    },
  });

  const classes = useStyles();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = props.coins.filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  const coinMap = filteredCoins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coins) => {
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
        <Pagination
          classes={{ ul: classes.pagination }}
          count={(props.coins?.length / 10).toFixed(0)}
          onChange={(event, value) => {
            setPage(value);
          }}
          style={{
            padding: 30,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          page={page}
        />
      </div>
    </div>
  );
}

export default Coins;
