import React from "react";
import Stock from "./Stock";

// componente responsável pela renderização do array das componentes <Stock>.

// o array resultante entra como argumento em React.Children.toArray() para que o React crie uma chave única para cada elemento, evitando problemas de organização.
const Stocks = ({ stocks, handleStockSubscribe }) => {
  return (
    <>
      {React.Children.toArray(
        stocks.map((stock) => (
          <Stock stock={stock} handleStockSubscribe={handleStockSubscribe} />
        ))
      )}
    </>
  );
};

export default Stocks;