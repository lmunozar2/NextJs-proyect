import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import PencilIcon from './icons/PencilIcon'
import TrashIcon from '../components/icons/TrashIcon'
import SearchBar from '@/components/SearchBar'
import Pagination from '@/components/Pagination'
import CreateGameModal from "@/components/modals/CreateGameModal"
import EditGameButton from "@/components/modals/EditGameButton"
import DeleteGameButton from "@/components/modals/DeleteGameButton" 

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    })
});

const ITEMS_PER_PAGE = 12;

interface GamesInfoProps {
    searchParams?: { page?: string; search?: string };
}

export default async function GamesInfo({ searchParams }: GamesInfoProps) {
    const currentPage = Number(searchParams?.page) || 1;
    const search = searchParams?.search ?? "";
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    const priceFilter = !isNaN(Number(search)) && search !== ""
        ? { price: { equals: Number(search) } }
        : {};

    const where = search
        ? {
            OR: [
                { title: { contains: search, mode: "insensitive" as const } },
                { developer: { contains: search, mode: "insensitive" as const } },
                { genre: { contains: search, mode: "insensitive" as const } },
                { consoles: { is: { name: { contains: search, mode: "insensitive" as const } } } },
                ...(priceFilter.price ? [priceFilter] : []),
            ],
        }
        : {};

    // ✅ Agrega consoles al Promise.all
    const [games, totalGames, consoles] = await Promise.all([
        prisma.games.findMany({
            where,
            include: { consoles: true },
            skip,
            take: ITEMS_PER_PAGE,
            orderBy: { id: "asc" },
        }),
        prisma.games.count({ where }),
        prisma.consoles.findMany({ orderBy: { name: "asc" } }),
    ]);

    const totalPages = Math.ceil(totalGames / ITEMS_PER_PAGE);

    return (
        <div className="p-8">

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Games</h1>
               
                <CreateGameModal consoles={consoles} />
            </div>

            <div className="flex justify-start mb-6 mt-2">
                <SearchBar />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map(function (game) {
                    return (
                        <div
                            key={game.id}
                            className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                        >
                            <img
                                src={"imgs/" + game.cover}
                                alt={game.title}
                                
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <EditGameButton game={game} consoles={consoles} />
                                <DeleteGameButton gameId={game.id} gameTitle={game.title} />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 group-hover:-translate-y-32">
                                <h2 className="text-white text-xl font-bold drop-shadow">{game.title}</h2>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                <p className="text-white text-sm mb-1">🎮 {game.consoles.name}</p>
                                <p className="text-white text-sm mb-1">👨‍💻 {game.developer}</p>
                                <p className="text-white text-sm mb-2 line-clamp-2">{game.description}</p>
                                <div className="flex gap-2">
                                    <span className="badge badge-secondary">{game.genre}</span>
                                    <span className="badge badge-accent">${game.price}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalGames}
                itemsPerPage={ITEMS_PER_PAGE}
            />

        </div>
    )
}