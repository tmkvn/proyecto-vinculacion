import React from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import MascotBanner from "./MascotBanner";
import { Link } from "react-router-dom";

const Header = ({ searchTerm, onSearchChange, mascots }) => {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-4 py-4">
        <Link to="/proyecto-vinculacion">
          <h1 className="text-3xl font-bold">UDIPSAI</h1>
        </Link>
        <MascotBanner mascots={mascots} />
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar juegos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
