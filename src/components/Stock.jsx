import React from "react";
import {CgClose} from 'react-icons/cg'

import "./Stock.css";

const Stock = ({ stock }) => {
  return (
    <div className="stock-container">
      {stock.symbol}
    </div>
  );
};

export default Stock;
