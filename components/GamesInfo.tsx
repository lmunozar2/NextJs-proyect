import { PrismaClient } from "../app/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import SearchBar from "@/components/SearchBar";
import Pagination from "@/components/Pagination";
import CreateGameModal from "@/components/modals/CreateGameModal";
import GamesClient from "@/components/modals/GamesClient";

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

  const priceFilter =
    !isNaN(Number(search)) && search !== ""
      ? { price: { equals: Number(search) } }
      : {};

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { developer: { contains: search, mode: "insensitive" as const } },
          { genre: { contains: search, mode: "insensitive" as const } },
          {
            consoles: {
              is: { name: { contains: search, mode: "insensitive" as const } },
            },
          },
          ...(priceFilter.price ? [priceFilter] : []),
        ],
      }
    : {};

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

      {/* 👇 Cliente */}
      <GamesClient games={games} consoles={consoles} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalGames}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}