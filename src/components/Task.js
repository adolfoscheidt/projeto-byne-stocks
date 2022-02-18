import React from "react";
import "./Task.css";

const Task = ({ tarefa }) => {
  return <div className="task-container">{tarefa.title}</div>;
};

export default Task;
