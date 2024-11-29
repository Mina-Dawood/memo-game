import React from "react";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <GameBoard />
    </div>
  );
};

export default App;
