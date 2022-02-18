import React, { useState } from "react";
import Tasks from "./components/Tasks";
import "./App.css";


const App = () => {
 
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Tocar gaita',
      completed: false,
    },
    {
      id: '2',
      title: 'Shãrbar a shônsha',
      completed: true,
    }
  ]);

  return (
    <>
      <div className="container">
        <Tasks tarefas={tasks}/>
      </div>
       
    </>
  );
};

export default App;
