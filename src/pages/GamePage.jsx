import React from "react";
import { useParams } from "react-router-dom";

const GamePage = () => {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case "restas":
        return <h1>Restas</h1>;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h2 className="text-3xl font-bold mb-4">Página en construcción</h2>
            <p className="text-lg">Juego seleccionado: {gameId}</p>
          </div>
        );
    }
  };

  return <div className="container py-8">{renderGame()}</div>;
};

export default GamePage;
