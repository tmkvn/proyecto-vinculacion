import React from "react";
import { useParams } from "react-router-dom";
import JuegoRestas from "../games/JuegoRestas";
import ReconocimientoUnidades from "../games/unidades/ReconocimientoUnidades";
import CazadorNumeros from "../games/cazadorNumeros/CazadoresNumeros";
import JuegoSerpiente from "../games/snake/JuegoSerpiente";

const GamePage = () => {
  const { gameId } = useParams();

  const renderGame = () => {
    switch (gameId) {
      case "restas":
        return <JuegoRestas />;
      case "reconocimiento-unidades":
        return <ReconocimientoUnidades />;
      case "cazador-numeros":
        return <CazadorNumeros />;
      case "juego-serpiente":
        return <JuegoSerpiente />;
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
