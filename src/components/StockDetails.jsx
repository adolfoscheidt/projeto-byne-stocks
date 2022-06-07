import React from "react";
import { useHistory, useParams } from "react-router-dom";

import Button from "./Button";

import "./StockDetails.css"

const StockDetails = ({ handleStockUnsubscribe }) => {

  const params = useParams();
  const history = useHistory();

  const handleBackButtonClick = () => {
    handleStockUnsubscribe(params.stockSymbol);
    history.goBack();
  }

  return (
    <>
      <div className="back-button-container">
        <Button onClick={handleBackButtonClick}>Voltar</Button>
        <div className="stock-details-container">
          <h2>{params.stockSymbol}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta aliquam temporibus nihil!
          </p>
        </div>
      </div>
    </>
  );
};

export default StockDetails;
