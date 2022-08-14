import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import coinGecko from "../api/coinGecko";
import DOMPurify from "dompurify";

import "../styles/Coin.css";
import HistoryChart from "../components/HistoryChart";

function Coin() {
  const params = useParams();
  const [coin, setCoin] = useState({});

  const formatData = (chartData) => {
    return chartData.map((value) => ({
      x: value[0],
      y: value[1].toFixed(2),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const [day, week, year, coinData] = await Promise.all([
        coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get(`/coins/${params.coinId}`),
      ]);

      setCoin({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        data: coinData.data,
      });
    };

    fetchData();
  }, []);

  const render = () => {
    return (
      <div>
        <div className="coin-container">
          <div className="content">
            <h1>{coin.data?.name}</h1>
          </div>
          <div className="content">
            <div className="rank">
              <span className="rank-btn">
                Rank # {coin.data?.market_cap_rank}
              </span>
            </div>
            <div className="info">
              <div className="coin-heading">
                {coin.data?.image? (
                  <img src={coin.data?.image.small} alt="" />
                ) : null}
                <p>{coin.data?.name}</p>
                {coin.data?.symbol ? (
                  <p>{coin.data?.symbol.toUpperCase()}/USD</p>
                ) : null}
              </div>
              <div className="coin-price">
                {coin.data?.market_data?.current_price ? (
                  <h1>
                    ${coin.data?.market_data.current_price.usd.toLocaleString()}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>

          <HistoryChart chartData={coin}/> 

          <div className="content">
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_1h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_24h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_24h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_24h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_24h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                  <td>
                    {coin.data?.market_data
                      ?.price_change_percentage_24h_in_currency ? (
                      <p>
                        {coin.data?.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                          1
                        )}
                        %
                      </p>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content">
            <div className="stats">
              <div className="left">
                <div className="row">
                  <h4>24 Hour Low</h4>
                  {coin.data?.market_data?.low_24h ? (
                    <p>${coin.data?.market_data.low_24h.usd.toLocaleString()}</p>
                  ) : null}
                </div>
                <div className="row">
                  <h4>24 Hour High</h4>
                  {coin.data?.market_data?.high_24h ? (
                    <p>
                      ${coin.data?.market_data.high_24h.usd.toLocaleString()}
                    </p>
                  ) : null}{" "}
                </div>
              </div>
              <div className="right">
                <div className="row">
                  <h4>Market Cap</h4>
                  {coin.data?.market_data?.market_cap ? (
                    <p>
                      ${coin.data?.market_data.market_cap.usd.toLocaleString()}
                    </p>
                  ) : null}
                </div>
                <div className="row">
                  <h4>Circulating Supply</h4>
                  {coin.data?.market_data ? (
                    <p>{coin.data?.market_data.circulating_supply}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="about">
              <h3>About</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    coin.data?.description ? coin.data.description.en : ""
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return render();

}

export default Coin;
