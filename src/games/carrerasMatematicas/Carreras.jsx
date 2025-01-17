import React from "react";

const CarrerasGame = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="/proyecto-vinculacion/carrerasMatematicas/index.html"
        width="100%"
        height="100%"
        title="Godot Game"
        style={{
          border: "none",
          display: "block",
          objectFit: "contain",
          minHeight: "75vh",
        }}
      />
    </div>
  );
  // return <h1>Hola</h1>
};

export default CarrerasGame;
