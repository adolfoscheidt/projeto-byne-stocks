import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Stocks from "./components/Stocks";
import "./App.css";
import AddStock from "./components/AddStock";
import Header from "./components/Header";
import Subtitle from "./components/Subtitle";
import StockDetails from "./components/StockDetails";

const App = () => {
  const socketUrl = "ws://localhost:8080";

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      let incomeData = JSON.parse(event.data);
      if (incomeData.event === "connected") {
        setStocks(incomeData.stocksData);
      } else if (incomeData.event === "stocks-update") {
        //  console.log(incomeData.stocks["IET"]);
        handlePriceUpdate(incomeData)
      } else {
        console.log("nada");
      }
    },
  });
 

  const [priceKeyArray, setPriceKeyArray] = useState([]);
  const [priceTimestamps, setPriceTimestamps] = useState([]);

  const [stocks, setStocks] = useState([]);

  const handleStockSubscribe = (stockSymbol) => {
    sendJsonMessage({
      event: "subscribe",
      stocks: [stockSymbol],
    });
  };

  const handleStockUnsubscribe = (stockSymbol) => {
    sendJsonMessage({
      event: "unsubscribe",
      stocks: [stockSymbol],
    });
  };

  const handleStockData = (stockSymbol) => {
    for (let index = 0; index < stocks.length; index++) {
      const element = stocks[index];
      if (element.symbol === stockSymbol){
        return [element.companyName, element.catchPhrase, element.basePrice];
      }
    }
  }

  const handlePriceUpdate = (messageData) => {
    if (priceKeyArray.length < 50){
    const newPriceKeyArray = [...priceKeyArray, messageData.stocks];
     setPriceKeyArray(newPriceKeyArray);
    }
    else {
      const newPriceKeyArray = [...priceKeyArray.slice(-50), messageData.stocks]
      setPriceKeyArray(newPriceKeyArray);
    }
   }


  // useEffect(() => {
  //   console.log(priceKeyArray)
  // }, [priceKeyArray])

 
  return (
    <Router>
      <div className="container">
        <Header />
        <Route
          path="/"
          exact
          render={() => (
            <>
              <Subtitle />
              <Stocks
                stocks={stocks}
                handleStockSubscribe={handleStockSubscribe}
              />
            </>
          )}
        />
        <Route
          path="/:stockSymbol"
          exact
          render={() => (
            <>
              <StockDetails 
              handleStockUnsubscribe={handleStockUnsubscribe} 
              handleStockData={handleStockData} 
              priceKeyArray={priceKeyArray} 
              setPriceKeyArray={setPriceKeyArray}/>
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default App;

// [
//   {
//     symbol: "IET",
//     companyName: "Morissette Group",
//     catchPhrase: "Proactive high-level framework",
//     basePrice: 564,
//   },
//   {
//     symbol: "N",
//     companyName: "Nisseun motors",
//     catchPhrase: "Focused solutions",
//     basePrice: 55,
//   },
// ]
