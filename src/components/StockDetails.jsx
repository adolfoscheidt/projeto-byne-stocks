import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { LineChart, Line, YAxis, ReferenceLine } from "recharts";

// componente responsável por renderizar o <Route> gerado depois que clicamos em uma tarefa.

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

  // informações da empresa que foi clicada
  const companyName = handleStockData(params.stockSymbol)[0];
  const catchPhrase = handleStockData(params.stockSymbol)[1];
  const basePrice = handleStockData(params.stockSymbol)[2];

  // função ativada quando clicamos no botão de voltar
  const handleBackButtonClick = () => {
    // desinscreve a empresa
    handleStockUnsubscribe(params.stockSymbol);
    // limpa o array de preços, para que novas empresas clicadas não tenham valores das antigas armazenadas nele. Coloquei um pequeno delay na execução disto pois às vezes o array era limpado mas ainda assim ele recebia uma atualização do servidor, visto que o Unsubscribe era executado ao mesmo tempo.
    setTimeout(function () {
      setPriceArray([]);
    }, 500);
    // redefine a url para a página anterior
    history.goBack();
  };

  // função responsável pela renderização do gráfico.
  // Como não houve um valor de eixo x especificado, o Recharts plota os preços de acordo com o seu índice no array.
  const renderLineChart = (
    <LineChart width={400} height={400} data={priceArray}>
      <Line type="monotone" dataKey={params.stockSymbol} stroke="#8884d8" />
      <YAxis
        type="number"
        tickFormatter={(value) => value.toFixed(2)}
        domain={["dataMin", "dataMax"]}
      />
      <ReferenceLine y={basePrice} label="basePrice" stroke="red" />
    </LineChart>
  );

  return (
    <>
      <div className="back-button-container">
        <div className="stock-details-container">
          <h2>{params.stockSymbol}</h2>
          <p>
            Company Name: <b>{companyName}</b>
          </p>
          <p>
            <i>"{catchPhrase}"</i>
          </p>
          <p>
            Base price:{" "}
            <span style={{ color: "rgb(238, 238, 13)", fontWeight: "bold" }}>
              {basePrice} Mi $
            </span>{" "}
          </p>
          {renderLineChart}
        </div>
        <Button onClick={handleBackButtonClick}>Voltar</Button>
      </div>
    </>
  );
};

export default StockDetails;

/* ----- PARA TESTES FUTUROS ------ */

/* ------ O bloco de código abaixo funcionou para atualizar os valores em tela, mas sobrecarrega o número de atualizações de componente. -------*/

// const [lastPrice, setLastPrice] = useState(["waiting"])

//  useEffect(() => {
//   if (priceArray.length > 0){
//     const TimeAndPrice = [priceArray[priceArray.length - 1][params.stockSymbol]];
//     setLastPrice(TimeAndPrice);
//     }
//  })
