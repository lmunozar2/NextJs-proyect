"use client";

import { useState } from "react";
import EditConsoleButton from "@/components/modals/EditConsoleButton";
import DeleteConsoleButton from "@/components/modals/DeleteConsoleButton";

export default function ConsolesClient({ consoles }: any) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {consoles.map((console: any) => (
        <div
          key={console.id}
          onClick={() =>
            setActiveCard(activeCard === console.id ? null : console.id)
          }
          className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
        >
          <img
            src={"imgs/" + console.image}
            alt={console.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

          {/* BOTONES */}
          <div
            className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300
              ${
                activeCard === console.id
                  ? "opacity-100"
                  : "opacity-0 md:group-hover:opacity-100"
              }`}
          >
            <EditConsoleButton consoleRecord={console} />
            <DeleteConsoleButton
              consoleId={console.id}
              consoleName={console.name}
            />
          </div>

          {/* TÍTULO */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500
              ${
                activeCard === console.id
                  ? "-translate-y-32"
                  : "md:group-hover:-translate-y-32"
              }`}
          >
            <h2 className="text-white text-xl font-bold drop-shadow">
              {console.name}
            </h2>
          </div>

          {/* INFO */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500
              ${
                activeCard === console.id
                  ? "translate-y-0"
                  : "translate-y-full md:group-hover:translate-y-0"
              }`}
          >
            <p className="text-white text-sm mb-1">
              🎮 {console.name}
            </p>
            <p className="text-white text-sm mb-1">
              🏭 {console.manufacturer}
            </p>
            <p className="text-white text-sm mb-2 line-clamp-2">
              {console.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}