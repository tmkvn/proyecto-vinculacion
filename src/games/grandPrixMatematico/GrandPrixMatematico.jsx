import React from "react";

const GrandPrixMatematico = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="/proyecto-vinculacion/grand-prix-matematico/grand-prix-matematico.html"
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

export default GrandPrixMatematico;
