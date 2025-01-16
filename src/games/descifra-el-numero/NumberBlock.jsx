import React from "react";
import { useDrag } from "react-dnd";

const NumberBlock = ({ number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "number",
    item: { number },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`w-16 h-16 flex items-center justify-center bg-yellow-400 
        rounded-lg cursor-move text-2xl font-bold shadow-lg
        ${isDragging ? "opacity-50" : "opacity-100"}
        hover:bg-yellow-500 transition-colors`}
    >
      {number}
    </div>
  );
};

export default NumberBlock;
