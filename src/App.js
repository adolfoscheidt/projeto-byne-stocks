import React, { useState } from "react";
import "./App.css";

const App = () => {
  // const message = "Hello world!";
  const [message, setMessage] = useState("mensagem inicial");

  return (
    <>
      <div className="container">{message}</div>
      <button onClick={() => setMessage("apertastes o botão, meus parabéns")}>
        mudar mensagem
      </button>
    </>
  );
};

export default App;
