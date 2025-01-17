import React from "react";

const ContarGame = () => {
  return (
    <div className="w-full h-full">
      <iframe
        src="/proyecto-vinculacion/colorea-y-suma/index.html"
        width="100%"
        height="100%"
        title="Colorea y Suma"
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

export default ContarGame;
