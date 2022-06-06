import React, { useState } from "react";
import "./AddStock.css";
import Button from "./Button";

const AddStock = ({ handleStockAddition }) => {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e) => {
    setInputData(e.target.value); //atualiza a variável de estágio com o que a pessoa digitou na caixa
  };

  const handleAddStockClick = () => {
    if (inputData === ""){alert ("Não é possível adicionar tarefas com texto vazio!");}
    else{
    handleStockAddition(inputData); //usa a função do App.jsx p/ criar um novo array de tarefas com o input recebido, quando o botão é apertado.
    setInputData(''); //limpa a caixa de texto
    }
  };

  return (
    <div className="add-stock-container">
      <input
        onChange={handleInputChange}
        value={inputData}
        className="add-stock-input"
        type="text"
      />
      <div className="add-stock-button-container">
        <Button onClick={handleAddStockClick}>Adicionar</Button>
      </div>
    </div>
  );
};

export default AddStock;
