import React from "react";
import Task from "./Task";

const Tasks = ( {tarefas} ) => {

    return(
        <>
        {tarefas.map((tarefa) => <Task tarefa={tarefa}/>)}
        </>
    )
} 

export default Tasks;