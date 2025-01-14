import React from "react";
import GameCard from "../ui/GameCard";

const GameGrid = ({ games }) => {
  return (
    <div className="grid gap-4 grid-rows-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {games.map((game, i) => (
        <GameCard key={i} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;
