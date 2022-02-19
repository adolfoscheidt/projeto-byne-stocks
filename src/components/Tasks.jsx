import React from "react";
import Task from "./Task";

const Tasks = ( {tasks, handleTaskClick, handleRemoveClick} ) => {

    return(
        <>
        {tasks.map((task) => <Task task={task} handleTaskClick={handleTaskClick} handleRemoveClick={handleRemoveClick}/>)}
        </>
    )
} 

export default Tasks;