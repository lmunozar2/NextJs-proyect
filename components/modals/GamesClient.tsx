"use client";

import { useState } from "react";
import EditGameButton from "@/components/modals/EditGameButton";
import DeleteGameButton from "@/components/modals/DeleteGameButton";

export default function GamesClient({ games, consoles }: any) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game: any) => (
        <div
          key={game.id}
          onClick={() =>
            setActiveCard(activeCard === game.id ? null : game.id)
          }
          className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
        >
          <img
            src={"imgs/" + game.cover}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

          <div
            className={`absolute top-3 right-3 flex gap-2 transition-opacity duration-300 
              ${
                activeCard === game.id
                  ? "opacity-100"
                  : "opacity-0 md:group-hover:opacity-100"
              }`}
          >
            <EditGameButton game={game} consoles={consoles} />
            <DeleteGameButton gameId={game.id} gameTitle={game.title} />
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 
              ${
                activeCard === game.id
                  ? "-translate-y-32"
                  : "md:group-hover:-translate-y-32"
              }`}
          >
            <h2 className="text-white text-xl font-bold drop-shadow">
              {game.title}
            </h2>
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 
              ${
                activeCard === game.id
                  ? "translate-y-0"
                  : "translate-y-full md:group-hover:translate-y-0"
              }`}
          >
            <p className="text-white text-sm mb-1">
              🎮 {game.consoles.name}
            </p>
            <p className="text-white text-sm mb-1">
              👨‍💻 {game.developer}
            </p>
            <p className="text-white text-sm mb-2 line-clamp-2">
              {game.description}
            </p>

            <div className="flex gap-2">
              <span className="badge badge-secondary">{game.genre}</span>
              <span className="badge badge-accent">${game.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}