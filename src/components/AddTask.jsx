import React, { useState } from "react";
import "./AddTask.css";
import Button from "./Button";

const AddTask = ({ handleTaskAddition }) => {
  const [inputData, setInputData] = useState("");

  const handleInputChange = (e) => {
    setInputData(e.target.value); //atualiza a variável de estágio com o que a pessoa digitou na caixa
  };

  const handleAddTaskClick = () => {
    handleTaskAddition(inputData); //usa a função do App.jsx p/ criar um novo array de tarefas com o input recebido, quando o botão é apertado.
    setInputData(''); //limpa a caixa de texto
  };

  return (
    <div className="add-task-container">
      <input
        onChange={handleInputChange}
        value={inputData}
        className="add-task-input"
        type="text"
      />
      <div className="add-task-button-container">
        <Button onClick={handleAddTaskClick}>Adicionar</Button>
      </div>
    </div>
  );
};

export default AddTask;
