import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Coin from './component/Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((res) => {
        setCoins(res.data);
        console.log("Here is my ", res.data);
      })

      .catch((error) => {
        console.log(error);
      }, []);
  });

  const handleChange = (event) => {
    setSearch(event.target.value);
  }
  const filteredCoins = coins.filter(
    coin =>coin.name.toLowerCase().includes(search.toLocaleLowerCase()));
  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a Currency</h1>
        <form>
          <input className="coin-input" placeholder="search" 
          type="text" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
        
             key={coin.id}
             name={coin.name}
             price={coin.current_price}
             symbol={coin.symbol}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}

            // This is the same as writing:
           // coin={coin}
          />
        );
      })}
    </div>
  );
}

export default App;
