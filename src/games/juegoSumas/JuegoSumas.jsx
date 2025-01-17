import React from "react";

const JuegoRestas = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="/proyecto-vinculacion/juego-sumas/juego-sumas.html"
        width="100%"
        height="100%"
        title="Godot Game"
        style={{
          border: "none",
          display: "block",
          objectFit: "contain",
          minHeight: "80vh",
        }}
      />
    </div>
  );
};

export default JuegoRestas;
