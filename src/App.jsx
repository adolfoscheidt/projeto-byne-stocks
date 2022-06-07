import React, { useState } from "react";
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

  // const socket = useWebSocket(socketUrl, {
  //   onMessage: (event) => {
  //     let incomeData = JSON.parse(event.data);
  //     if (incomeData.event === "connected") {
  //       setStocks(incomeData.stocksData);
  //       // sendJsonMessage({
  //       //   event: "subscribe",
  //       //   stocks: ["IET", "ZHT"],
  //       // });
  //     } else if (incomeData.event === "stocks-update") {
  //       console.log(incomeData);
  //     }
  //     else {
  //       console.log("nada")
  //     }
  //   }
  // });

  const { lastMessage, sendJsonMessage } = useWebSocket(socketUrl);
  console.log(lastMessage);

  const [stocks, setStocks] = useState([
    {
      symbol: "IET",
      companyName: "Morissette Group",
      catchPhrase: "Proactive high-level framework",
      basePrice: 564,
    },
    {
      symbol: "N",
      companyName: "Nisseun motors",
      catchPhrase: "Focused solutions",
      basePrice: 55,
    },
  ]);

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

  // socket.onmessage = function (event){
  //   let newStocks = JSON.parse(event.data).stocksData;
  //   setStocks(newStocks);
  // }

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
              <StockDetails handleStockUnsubscribe={handleStockUnsubscribe}/>
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default App;
