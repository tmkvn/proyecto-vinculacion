import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <Link
      to={game.href}
      className="group relative aspect-square rounded-lg bg-white/50 p-4 shadow-lg backdrop-blur-sm transition-transform hover:scale-105 hover:shadow-xl block"
    >
      <div className="absolute top-2 right-2 text-yellow-400">⭐</div>
      <div className="absolute top-2 left-2 text-yellow-400">☀️</div>
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <div className="text-4xl group-hover:animate-bounce">{game.icon}</div>
        <div className="text-lg font-medium">{game.title}</div>
      </div>
    </Link>
  );
};

export default GameCard;
