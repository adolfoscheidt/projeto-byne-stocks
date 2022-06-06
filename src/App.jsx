import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

import Stocks from "./components/Stocks";
import "./App.css";
import AddStock from "./components/AddStock";
import Header from "./components/Header";
import Subtitle from "./components/Subtitle";

const App = () => {

  // const socketUrl = "ws://localhost:8080";

  // const { sendJsonMessage, lastMessage } = useWebSocket(socketUrl, {
  //   onMessage: (event) => {
  //     let incomeData = JSON.parse(event.data);
  //     if (incomeData.event === "connected") {
  //       setStocks(incomeData.stocksData);
  //       sendJsonMessage({
  //         event: "subscribe",
  //         stocks: ["IET", "ZHT"],
  //       });
  //     } else if (incomeData.event === "stocks-update") {
  //       console.log(incomeData);
  //     }
  //     else {
  //       console.log("nada")
  //     }
  //   }
  // });

  // sendJsonMessage({
  //       "event": "subscribe",
  //       "stocks": ["IET", "ZHT"]
  //     })

  //  shouldReconnect: (closeEvent) => true,

  // console.log(JSON.parse(lastMessage.data).stocksData);

  const [stocks, setStocks] = useState([
    {
      symbol: "IET",
      companyName: "Morissette Group",
      catchPhrase: "Proactive high-level framework",
      basePrice: 564,
    },
  ]);

  // socket.onmessage = function (event){
  //   let newStocks = JSON.parse(event.data).stocksData;
  //   setStocks(newStocks);
  // }

  return (
    <>
      <div className="container">
        <Header />
        <AddStock />
        <Subtitle />
        <Stocks stocks={stocks} />
      </div>
    </>
  );
};

export default App;
