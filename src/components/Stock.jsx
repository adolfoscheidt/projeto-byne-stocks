import React from "react";
import { CgClose } from "react-icons/cg";
import { useHistory } from "react-router-dom";

import "./Stock.css";

const Stock = ({ stock, handleStockSubscribe }) => {
  const history = useHistory();

  const handleStockDetailsClick = () => {
    history.push(`/${stock.symbol}`);
    handleStockSubscribe(stock.symbol);
  };

  return (
    <div className="stock-container" onClick={handleStockDetailsClick}>
      {stock.symbol}
    </div>
  );
};

export default Stock;
