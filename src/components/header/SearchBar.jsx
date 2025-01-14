const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
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
  );
};
