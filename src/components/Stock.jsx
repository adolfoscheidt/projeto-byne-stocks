import React from "react";
import { useHistory } from "react-router-dom";

import "./Stock.css";

// componente responsável pela criação do container de cada stock.

const Stock = ({ stock, handleStockSubscribe }) => {
  const history = useHistory();
  
  // função chamada quando clicamos em uma tarefa.
  const handleStockDetailsClick = () => {
    // atualiza a url com o símbolo da empresa clicada, gerando a renderização do <Route> no path correspondente.
    history.push(`/${stock.symbol}`);
    // inscreve a empresa para atualizações de preços
    handleStockSubscribe(stock.symbol);
  };

  return (
    <div className="stock-container" onClick={handleStockDetailsClick}>
      {stock.symbol}
    </div>
  );
};

export default Stock;
