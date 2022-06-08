import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

import Button from "./Button";

import "./StockDetails.css";

const testData = [
  { name: "A", value: 20 },
  { name: "B", value: 30 },
  { name: "C", value: -10 },
];

const StockDetails = ({
  handleStockUnsubscribe,
  handleStockData,
  priceKeyArray,
  setPriceKeyArray,
  setPriceTimestamps,
}) => {
  const params = useParams();
  const history = useHistory();

  const handleBackButtonClick = () => {
    handleStockUnsubscribe(params.stockSymbol);
    setTimeout(function () {
      setPriceKeyArray([]);
      setPriceTimestamps([]);
    }, 500);
    history.goBack();
  };

  const [currentPrice, setCurrentPrice] = useState(
    handleStockData(params.stockSymbol)
  );

  const renderLineChart = (
    <LineChart width={400} height={400} data={priceKeyArray}>
      <Line type="monotone" dataKey={params.stockSymbol} stroke="#8884d8" />
    </LineChart>
  );

  return (
    <>
      <div className="back-button-container">
        <Button onClick={handleBackButtonClick}>Voltar</Button>
        <div className="stock-details-container">
          <h2>{params.stockSymbol}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            aliquam temporibus nihil!
          </p>
          {renderLineChart}
          <p></p>
        </div>
      </div>
    </>
  );
};

// {priceKeyArray.slice(-1)}

export default StockDetails;
