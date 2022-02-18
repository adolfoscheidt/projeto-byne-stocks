import React from "react";
import "./Task.css";

const Task = ({ task, handleTaskClick }) => {
  return (
     <div className="task-container" style={task.completed ? { borderLeft: '6px solid rgb(238, 238, 13)'} : {}} onClick={() => handleTaskClick(task.id)}>
          {task.title}
      </div>
  )
  // return <div className="task-container">{task.title}</div>;
};

export default Task;
