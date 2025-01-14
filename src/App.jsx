import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import { games, mascots } from "./data/GameData";
import GameGrid from "./components/layout/GameGrid";
import GamePage from "./pages/GamePage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-sky-200 to-green-200">
        <Header
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          mascots={mascots}
        />
        <Routes>
          <Route
            path="/proyecto-vinculacion"
            element={
              <main className="container py-8">
                <GameGrid games={filteredGames} />
              </main>
            }
          />
          <Route
            path="/proyecto-vinculacion/game/:gameId"
            element={<GamePage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
