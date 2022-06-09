import React, { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Stocks from "./components/Stocks";
import "./App.css";
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
         handlePriceUpdate(incomeData)
      } else if (incomeData.event === "disconnecting"){
        alert(incomeData.reason);
      }
    }, retryOnError: true,
  });
 
  const [priceArray, setPriceArray] = useState([]);

  const [stocks, setStocks] = useState([{symbol: "Aguardando conexão com o servidor!"}]);

  const handleStockSubscribe = (stockSymbol) => {
    sendJsonMessage({
      event: "subscribe",
      stocks: [stockSymbol],
    });
    // setPriceArray(handleStockData(stockSymbol)[2]);
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
    const arrayMaxLength = 50;
    if (priceArray.length < arrayMaxLength){
    const newPriceArray = [...priceArray, messageData.stocks];
     setPriceArray(newPriceArray);
    }
    else {
      const newPriceArray = [...priceArray.slice(-arrayMaxLength), messageData.stocks]
      setPriceArray(newPriceArray);
    }
   }


  // useEffect(() => {
  //   console.log( )
  // }, [ ]);

 
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
              priceArray={priceArray} 
              setPriceArray={setPriceArray}/>
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
