import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { LineChart, Line, YAxis, ReferenceLine } from "recharts";

import Button from "./Button";

import "./StockDetails.css";


const StockDetails = ({
  handleStockUnsubscribe,
  handleStockData,
  priceKeyArray,
  setPriceKeyArray,
 }) => {
  const params = useParams();
  const history = useHistory();



  const handleBackButtonClick = () => {
    handleStockUnsubscribe(params.stockSymbol);
    setTimeout(function () {
      setPriceKeyArray([]);
     }, 500);
    history.goBack();
  };

  const [currentPrice, setCurrentPrice] = useState(
    handleStockData(params.stockSymbol)
  );

  const renderLineChart = (
    <LineChart width={400} height={400} data={priceKeyArray}>
      <Line type="monotone" dataKey={params.stockSymbol} stroke="#8884d8" />
      <YAxis type="number" tickFormatter={(value) => value.toFixed(2)} unit="$" domain={['dataMin', 'dataMax']}/>
      <ReferenceLine y={currentPrice[2]} label="basePrice" stroke="red" />
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
