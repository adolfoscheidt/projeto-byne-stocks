import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Stocks from "./components/Stocks";
import "./App.css";
import Header from "./components/Header";
import Subtitle from "./components/Subtitle";
import StockDetails from "./components/StockDetails";

const App = () => {

  const socketUrl = "ws://localhost:8080";

  // abrindo a conexão com o servidor 
  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onMessage: (event) => {
      let incomeData = JSON.parse(event.data);
      if (incomeData.event === "connected") {
        setStocks(incomeData.stocksData);
      } else if (incomeData.event === "stocks-update") {
        handlePriceUpdate(incomeData);
      } else if (incomeData.event === "disconnecting") {
        alert(incomeData.reason);
      }
    },
    // opção para que o client continue tentando a conexão caso não seja bem sucedida de primeira.
    retryOnError: true,
  });
  
  // hook de estado que cria um array onde os preços enviados pelo servidor são armazenados.
  const [priceArray, setPriceArray] = useState([]);

  // hook de estado que armazena as empresas e suas informações.
  const [stocks, setStocks] = useState([
    { symbol: "Aguardando conexão com o servidor!" },
  ]);

  // função que realiza a inscrição de uma empresa
  const handleStockSubscribe = (stockSymbol) => {
    sendJsonMessage({
      event: "subscribe",
      stocks: [stockSymbol],
    });
   };

  //função que desinscreve uma empresa
  const handleStockUnsubscribe = (stockSymbol) => {
    sendJsonMessage({
      event: "unsubscribe",
      stocks: [stockSymbol],
    });
  };

  // função que cria um array com os dados de uma empresa. É chamada toda vez que clicamos em um stock.
  // a função mapeia todos os stocks disponíveis e identifica qual possui o mesmo stockSymbol do stock que foi clicado. Após isso retorna os dados.
  const handleStockData = (stockSymbol) => {
    for (let index = 0; index < stocks.length; index++) {
      const element = stocks[index];
      if (element.symbol === stockSymbol) {
        return [element.companyName, element.catchPhrase, element.basePrice];
      }
    }
  };

  // função responsável por atualizar o array de preços (priceArray). É chamada quando atualizações de preços chegam por mensagens do servidor
  const handlePriceUpdate = (messageData) => {
    // número máximo de preços que o array armazena, para que o gráfico não fique com muitos dados. 
    const arrayMaxLength = 50;
    if (priceArray.length < arrayMaxLength) {
      const newPriceArray = [...priceArray, messageData.stocks];
      setPriceArray(newPriceArray);
    } else {
      const newPriceArray = [
        ...priceArray.slice(-arrayMaxLength),
        messageData.stocks,
      ];
      setPriceArray(newPriceArray);
    }
  };

  // cada <Route> é uma página diferente que é renderizada de acordo com a url, especificada pelo parâmetro "path". (Biblioteca react-router-dom)
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
                setPriceArray={setPriceArray}
              />
            </>
          )}
        />
      </div>
    </Router>
  );
};

export default App;
