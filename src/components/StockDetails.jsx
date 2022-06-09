import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { LineChart, Line, YAxis, ReferenceLine } from "recharts";

import Button from "./Button";

import "./StockDetails.css";

const StockDetails = ({
  handleStockUnsubscribe,
  handleStockData,
  priceArray,
  setPriceArray,
}) => {
  const params = useParams();
  const history = useHistory();

  const handleBackButtonClick = () => {
    handleStockUnsubscribe(params.stockSymbol);
    setTimeout(function () {
      setPriceArray([]);
    }, 500);
    history.goBack();
  };

  const renderLineChart = (
    <LineChart width={400} height={400} data={priceArray}>
      <Line type="monotone" dataKey={params.stockSymbol} stroke="#8884d8" />
      <YAxis
        type="number"
        tickFormatter={(value) => value.toFixed(2)}
        domain={["dataMin", "dataMax"]}
      />
      <ReferenceLine
        y={handleStockData(params.stockSymbol)[2]}
        label="basePrice"
        stroke="red"
      />
    </LineChart>
  );

  return (
    <>
      <div className="back-button-container">
         <div className="stock-details-container">
          <h2>{params.stockSymbol}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            aliquam temporibus nihil!
          </p>
          {renderLineChart}
          <p></p>
        </div>
        <Button onClick={handleBackButtonClick}>Voltar</Button>
      </div>
    </>
  );
};

/* ----- PARA TESTES FUTUROS ------ */

/* ------ O bloco de código abaixo funcionou para atualizar os valores em tela, mas sobrecarrega o número de atualizações de componente. -------*/

// const [lastPrice, setLastPrice] = useState(["waiting"])

//  useEffect(() => {
//   if (priceArray.length > 0){
//     const TimeAndPrice = [priceArray[priceArray.length - 1][params.stockSymbol]];
//     setLastPrice(TimeAndPrice);
//     }
//  })

export default StockDetails;
