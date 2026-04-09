
import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!,
    }),
});

const ITEMS_PER_PAGE = 12;

interface GamesInfoProps {
    searchParams?: { page?: string; search?: string };
}

export default async function GamesInfo({ searchParams }: GamesInfoProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const search = searchParams?.search ?? "";
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    // Filtro dinámico de Prisma
    const priceFilter = !isNaN(Number(search)) && search !== ""
        ? { price: { equals: Number(search) } }
        : {};

    const where = search
        ? {
            OR: [
                { title:     { contains: search, mode: "insensitive" as const } },
                { developer: { contains: search, mode: "insensitive" as const } },
                { genre:     { contains: search, mode: "insensitive" as const } },
                { console:   { is: { name: { contains: search, mode: "insensitive" as const } } } },
                ...(priceFilter.price ? [priceFilter] : []),
            ],
        }
        : {};

    const [games, totalGames] = await Promise.all([
        prisma.games.findMany({
            where,
            include: { consoles: true },
            skip,
            take: ITEMS_PER_PAGE,
            orderBy: { id: "asc" },
        }),
        prisma.games.count({ where }),
    ]);

    const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);

    return (
        <div className="w-full min-h-screen bg-base-300 p-6 lg:p-10">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <h1 className="text-3xl font-bold text-white tracking-tight whitespace-nowrap">
                    Games
                </h1>

                {/* SearchBar ocupa el espacio flexible del centro */}
                <div className="flex-1 flex justify-start pl-4">
                    <SearchBar />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-primary/60 uppercase tracking-widest whitespace-nowrap md:hidden">
                        {totalGames} titles
                    </span>
                    <Link href="/games/add" className="btn btn-sm btn-outline btn-success text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 transform hover:scale-105">
                    
                        Add Game
                    </Link>
                </div>
            </div>

            {/* Sin resultados */}
            {games.length === 0 && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <svg className="w-10 h-10 text-white/10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                    </svg>
                    <p className="text-white/20 text-sm font-mono tracking-widest uppercase">
                        No games found for &quot;{search}&quot;
                    </p>
                </div>
            )}

            {/* Grid */}
            {games.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {games.map((game) => (
                        <div
                            key={game.id}
                            className="group card bg-base-100/40 backdrop-blur-xl border border-white/[0.07] hover:border-primary/40 shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Image */}
                            <figure className="relative h-44 overflow-hidden">
                                <Image
                                    src={`/imgs/${game.cover}`}
                                    alt={game.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-base-300/90 via-transparent to-transparent" />
                                <div className="absolute top-3 right-3 badge badge-sm bg-primary/20 border border-primary/30 text-primary backdrop-blur-md font-medium">
                                    {game.genre}
                                </div>
                            </figure>

                            {/* Body */}
                            <div className="card-body p-4 gap-0">
                                <h2 className="card-title text-base text-white font-bold leading-snug line-clamp-2 mb-3">
                                    {game.title}
                                </h2>

                                <div className="space-y-1.5 mb-3">
                                    <div className="flex items-center gap-2 text-xs">
                                        <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                        </svg>
                                        <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Dev</span>
                                        <span className="text-white/70 truncate">{game.developer}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                                        </svg>
                                        <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Console</span>
                                        <span className="text-white/70 truncate">{game.consoles.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <svg className="w-3.5 h-3.5 text-primary/50 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                        </svg>
                                        <span className="text-white/30 uppercase tracking-widest font-semibold text-[10px] w-12 shrink-0">Release</span>
                                        <span className="text-white/70">{new Date(game.releasedate).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="divider my-0 before:bg-white/5 after:bg-white/5" />

                                <p className="text-white/30 text-[11px] leading-relaxed line-clamp-2 my-2">
                                    {game.description}
                                </p>

                                <div className="card-actions items-center justify-between mt-1">
                                    <span className="text-primary font-mono font-bold text-lg tracking-tight">
                                        ${game.price.toFixed(2)}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button className="btn btn-sm btn-outline btn-info text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 transform hover:scale-105">
                                      
                                        </button>
                                        <button className="btn btn-sm btn-outline btn-error text-[11px] uppercase tracking-widest font-semibold transition-all duration-200 transform hover:scale-105">
                                            
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalGames}
                itemsPerPage={ITEMS_PER_PAGE}
            />

        </div>
    );
}