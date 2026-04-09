"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  games: any[];
  consoles: any[];
}

const COLORS = ["#a855f7", "#22c55e", "#3b82f6", "#f97316", "#ef4444"];

export default function DashboardCharts({ games, consoles }: Props) {
  const gamesByConsole = consoles.map((c) => ({
    name: c.name,
    games: c.games.length,
  }));

  const genreMap: Record<string, number> = {};

  games.forEach((g) => {
    genreMap[g.genre] = (genreMap[g.genre] || 0) + 1;
  });

  const genreData = Object.keys(genreMap).map((key) => ({
    name: key,
    value: genreMap[key],
  }));

  const totalGames = games.length;
  const avgPrice =
    games.reduce((acc, g) => acc + g.price, 0) / (games.length || 1);

  return (
    <div className="p-4 md:p-6 space-y-10">
      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-base-200/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm opacity-70">Total Games</p>
          <p className="text-3xl font-bold text-purple-400">{totalGames}</p>
        </div>

        <div className="bg-base-200/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm opacity-70">Games Average Price</p>
          <p className="text-3xl font-bold text-green-400">
            ${avgPrice.toFixed(2)}
          </p>
        </div>

        <div className="bg-base-200/60 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition">
          <p className="text-sm opacity-70">Consoles</p>
          <p className="text-3xl font-bold text-blue-400">{consoles.length}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-base-200/60 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="mb-4 font-semibold text-lg text-white">
            Games per Console
          </h2>

          <div className="w-full h-[300px] md:h-[350px] lg:h-[400px]">
            <ResponsiveContainer>
              <BarChart
                data={gamesByConsole}
                margin={{ top: 10, right: 20, left: -10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#aaa", fontSize: 12 }}
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis tick={{ fill: "#aaa" }} />

                <Tooltip cursor={false} />

                <Legend />

                <Bar
                  dataKey="games"
                  isAnimationActive={true}
                  fill="#a855f7"
                  radius={[10, 10, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-base-200/60 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl shadow-lg">
          <h2 className="mb-4 font-semibold text-lg text-white">
            Genres Distribution
          </h2>

          <div className="w-full h-[300px] md:h-[350px] lg:h-[400px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={genreData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={3}
                >
                  {genreData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f1f2e",
                    border: "1px solid #333",
                    borderRadius: "10px",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
