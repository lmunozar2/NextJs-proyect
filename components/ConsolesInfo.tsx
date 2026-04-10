import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import CreateConsoleModal from "@/components/modals/CreateConsoleModal"
import ConsolesClient from "@/components/modals/ConsolesClient"

const prisma = new PrismaClient({
  adapter: new PrismaNeon({
    connectionString: process.env.DATABASE_URL!
  })
})

export default async function ConsolesInfo() {

  const consoles = await prisma.consoles.findMany({
    orderBy: { id: 'asc' }
  })

  return (
    <div className="p-8">

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Consoles</h1>
        <CreateConsoleModal />
      </div>

      {/* 👇 Cliente */}
      <ConsolesClient consoles={consoles} />

    </div>
  )
}