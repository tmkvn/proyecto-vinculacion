import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ position, onDrop, label, value, isLocked }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "number",
    drop: (item) => onDrop(position, item.number),
    canDrop: () => !isLocked,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-4 rounded-lg p-4 min-h-[150px]
        flex flex-col items-center justify-center transition-all duration-200
        ${isOver && !isLocked ? "border-blue-500 bg-blue-100 scale-105" : ""}
        ${
          isLocked
            ? "border-solid border-green-500 bg-green-50 cursor-not-allowed"
            : "border-dashed border-gray-300 bg-white"
        }`}
    >
      <span className="text-lg font-bold mb-2">{label}</span>
      <div
        className={`w-20 h-20 flex items-center justify-center text-3xl font-bold
        ${isLocked ? "text-green-600" : "text-gray-400"}`}
      >
        {value !== null ? value : "?"}
      </div>
    </div>
  );
};

export default DropZone;
