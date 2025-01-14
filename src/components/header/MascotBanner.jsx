import React from "react";

const MascotBanner = ({ mascots }) => {
  return (
    <div className="flex-1 flex items-center justify-center gap-6 overflow-x-auto px-2 overflow-y-hidden">
      {mascots.map((mascot, i) => (
        <div
          key={i}
          className="text-3xl animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {mascot}
        </div>
      ))}
    </div>
  );
};

export default MascotBanner;
