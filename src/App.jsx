import React, { useState } from "react";
import { v4 as uuidv4} from "uuid";

import Tasks from "./components/Tasks";
import "./App.css";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Subtitle from "./components/Subtitle";


const App = () => {
 
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Tocar Acordeon',
      completed: false,
    },
    {
      id: '2',
      title: 'Preparar o almoço',
      completed: true,
    }
  ]);

  const handleTaskClick = (taskID) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskID) return {...task, completed: !task.completed};

      return task;
    })

    setTasks(newTasks);
  }

  const handleRemoveClick = (taskID) => {
    for( var i = 0; i < tasks.length; i++){ 
    
      if ( tasks[i].id === taskID) { 
          const newTasks = tasks.splice(i, 1); 
          setTasks(newTasks);
      }
  }
}

  const handleTaskAddition = (taskTitle) => {
    const newTasks = [...tasks, {
      title: taskTitle,
      id: uuidv4(),
      completed:false,
    }]

    setTasks(newTasks);
  }

  return (
    <>
      <div className="container">
        <Header />
        <AddTask handleTaskAddition={handleTaskAddition}/>
        <Subtitle />
        <Tasks tasks={tasks} handleTaskClick={handleTaskClick} handleRemoveClick={handleRemoveClick}/>
      </div>
       
    </>
  );
};

export default App;
