import { useState } from "react";
import "./App.css";

function App() {
  return (
    <>
      <div className="w-full h-full">
        <iframe
          src="/SubstractionGame/SubstractionGame.html"
          width="100%"
          height="500px"
          title="Godot Game"
          style={{
            border: "none",
            display: "block",
            objectFit: "contain",
            minHeight: "75vh",
          }}
        />
      </div>
    </>
  );
}

export default App;
