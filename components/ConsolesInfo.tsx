import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import PencilIcon from '../components/icons/PencilIcon'
import PlusCircleIcon from '../components/icons/PlusIcon'
import TrashIcon from '../components/icons/TrashIcon'
import CreateConsoleModal from "@/components/modals/CreateConsoleModal"
import EditConsoleButton from "@/components/modals/EditConsoleButton"
import DeleteConsoleButton from "@/components/modals/DeleteConsoleButton"


const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    })
})

export default async function ConsolesInfo() {

    const consoles = await prisma.consoles.findMany({
        
    })

    return(
 <div className="p-8">

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Consoles</h1>
                <CreateConsoleModal />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {consoles.map(function(console) {
                    return (
                        <div
                            key={console.id}
                            className="relative w-96 h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                        >
                            <img
                                src={"imgs/" + console.image}
                                alt={console.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500" />

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <EditConsoleButton consoleRecord={console} />
                                <DeleteConsoleButton consoleId={console.id} consoleName={console.name} />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-500 group-hover:-translate-y-32">
                                <h2 className="text-white text-xl font-bold drop-shadow">{console.name}</h2>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                                <p className="text-white text-sm mb-1">🎮 {console.name}</p>
                                <p className="text-white text-sm mb-1">👨‍💻 {console.manufacturer}</p>
                                <p className="text-white text-sm mb-2 line-clamp-2">{console.description}</p>
                                
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}