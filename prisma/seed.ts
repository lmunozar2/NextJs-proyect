import 'dotenv/config'
import { PrismaClient } from '../app/generated/prisma'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

    console.log('🌱 Starting seed...')

    // -----------------------------
    // 1. Clean database
    // -----------------------------

    await prisma.games.deleteMany()
    await prisma.consoles.deleteMany()

    console.log('🧹 Database cleaned')

    // -----------------------------
    // 2. Create Consoles
    // -----------------------------

    const consoles = await prisma.consoles.createMany({
        data: [
            {
                name: 'PlayStation 5',
                manufacturer: 'Sony Interactive Entertainment',
                image: 'Ps5',
                releasedate: new Date('2020-11-12'),
                description:
                    'The PlayStation 5 (PS5) is a home video game console bringing 4K gaming at 120Hz and ray tracing support.',
            },
            {
                name: 'Xbox Series X',
                manufacturer: 'Microsoft',
                image: 'Xbox',
                releasedate: new Date('2020-11-10'),
                description:
                    'The Xbox Series X is a high-performance console, featuring a custom AMD processor and 12 TFLOPS of graphical power.',
            },
            {
                name: 'Nintendo Switch OLED Model',
                manufacturer: 'Nintendo',
                releasedate: new Date('2021-10-08'),
                description:
                    'A hybrid console that can be used as a home console and a portable handheld device, now with a vibrant OLED screen.',
            },
            {
                name: 'Nintendo Switch 2',
                manufacturer: 'Nintendo',
                image: 'Switch2',
                releasedate: new Date('2025-06-05'),
                description:
                    'The successor to the popular Nintendo Switch, featuring larger magnetic Joy-cons and enhanced performance.',
            },
            {
                name: 'Steam Deck OLED',
                manufacturer: 'Valve',
                image: 'Steam',
                releasedate: new Date('2023-11-16'),
                description:
                    'A powerful handheld gaming computer that plays PC games from your Steam library on the go.',
            },
        ],
    })

    console.log('🎮 5 consoles seeded')

    // -----------------------------
    // 3. Get consoles from DB
    // -----------------------------

    const allConsoles = await prisma.consoles.findMany()

    const ps5 = allConsoles.find(c => c.name === 'PlayStation 5')
    const xbox = allConsoles.find(c => c.name === 'Xbox Series X')
    const switchOLED = allConsoles.find(c => c.name === 'Nintendo Switch OLED Model')
    const switch2 = allConsoles.find(c => c.name === 'Nintendo Switch 2')
    const steamDeck = allConsoles.find(c => c.name === 'Steam Deck OLED')

    // -----------------------------
    // 4. Create Games
    // -----------------------------

    const gamesData = [
        {
            title: 'God of War Ragnarök',
            developer: 'Santa Monica Studio',
            cover: 'God_of_War_Ragnarök.jpg',
            releasedate: new Date('2022-11-09'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Kratos and Atreus must journey to each of the Nine Realms and find answers as the forces of Asgard prepare for a prophesied battle.',
            console_id: ps5?.id,
        },
        {
            title: 'Halo Infinite',
            developer: '343 Industries',
            cover: 'Halo_Infinite.jpeg',
            releasedate: new Date('2021-12-08'),
            price: 59.99,
            genre: 'First-person shooter',
            description:
                'Master Chief returns in the most expansive Halo campaign yet.',
            console_id: xbox?.id,
        },
        {
            title: 'The Legend of Zelda: Tears of the Kingdom',
            developer: 'Nintendo EPD',
            cover: 'Zelda.jpg',
            releasedate: new Date('2023-05-12'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Link soars through the skies and explores new areas of Hyrule.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Elden Ring',
            developer: 'FromSoftware',
            cover: 'Elden_Ring.jpeg',
            releasedate: new Date('2022-02-25'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'A fantasy action RPG adventure set within a world created by Hidetaka Miyazaki.',
            console_id: ps5?.id,
        },
        {
            title: 'Forza Horizon 5',
            developer: 'Playground Games',
            cover: 'Forza.jpeg',
            releasedate: new Date('2021-11-09'),
            price: 59.99,
            genre: 'Racing',
            description:
                'Explore the vibrant open world landscapes of Mexico.',
            console_id: xbox?.id,
        },
        {
            title: 'Pokémon Scarlet',
            developer: 'Game Freak',
            cover: 'Pokemon.avif',
            releasedate: new Date('2022-11-18'),
            price: 59.99,
            genre: 'Role-playing',
            description:
                'Embark on a new journey in the Paldea region.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Spider-Man 2',
            developer: 'Insomniac Games',
            cover: 'Spiderman.avif',
            releasedate: new Date('2023-10-20'),
            price: 69.99,
            genre: 'Action-adventure',
            description:
                'Peter Parker and Miles Morales face the Symbiote threat.',
            console_id: ps5?.id,
        },
        {
            title: 'Starfield',
            developer: 'Bethesda Game Studios',
            cover: 'Starfield.jpg',
            releasedate: new Date('2023-09-06'),
            price: 69.99,
            genre: 'Role-playing',
            description:
                'Explore the vastness of space and create your own story.',
            console_id: xbox?.id,
        },
        {
            title: 'Mario Kart 9',
            developer: 'Nintendo EPD',
            cover: 'Mario_Kart.avif',
            releasedate: new Date('2025-12-01'),
            price: 59.99,
            genre: 'Racing',
            description:
                'The next installment in the popular Mario Kart series.',
            console_id: switch2?.id,
        },
        {
            title: 'Hogwarts Legacy',
            developer: 'Avalanche Software',
            cover: 'Hogwarts_Legacy.avif',
            releasedate: new Date('2023-02-10'),
            price: 59.99,
            genre: 'Action role-playing',
            description:
                'Experience a new story set in the wizarding world.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Red Dead Redemption 2',
            developer: 'Rockstar Games',
            cover: 'rdr2.jpg',
            releasedate: new Date('2018-10-26'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'An epic tale of life in Americas unforgiving heartland.',
            console_id: ps5?.id,
        },
        {
            title: 'Cyberpunk 2077',
            developer: 'CD Projekt Red',
            cover: 'cyberpunk2077.jpg',
            releasedate: new Date('2020-12-10'),
            price: 49.99,
            genre: 'Action role-playing',
            description: 'An open-world adventure set in the megalopolis of Night City.',
            console_id: ps5?.id,
        },
        {
            title: 'The Witcher 3: Wild Hunt',
            developer: 'CD Projekt Red',
            cover: 'witcher3.jpg',
            releasedate: new Date('2015-05-19'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'A story-driven open world RPG set in a visually stunning fantasy universe.',
            console_id: ps5?.id,
        },
        {
            title: 'Grand Theft Auto V',
            developer: 'Rockstar Games',
            cover: 'gtav.jpg',
            releasedate: new Date('2013-09-17'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Three criminals plan heists across the fictional state of San Andreas.',
            console_id: xbox?.id,
        },
        {
            title: 'Minecraft',
            developer: 'Mojang Studios',
            cover: 'minecraft.jpg',
            releasedate: new Date('2011-11-18'),
            price: 29.99,
            genre: 'Sandbox',
            description: 'A game about placing blocks and going on adventures.',
            console_id: xbox?.id,
        },
        {
            title: 'Assassins Creed Valhalla',
            developer: 'Ubisoft Montreal',
            cover: 'ac_valhalla.jpg',
            releasedate: new Date('2020-11-10'),
            price: 49.99,
            genre: 'Action role-playing',
            description: 'Become a legendary Viking warrior in ninth-century Europe.',
            console_id: ps5?.id,
        },
        {
            title: 'Death Stranding',
            developer: 'Kojima Productions',
            cover: 'death_stranding.jpg',
            releasedate: new Date('2019-11-08'),
            price: 39.99,
            genre: 'Action',
            description: 'Reconnect a fractured society by delivering cargo across a post-apocalyptic world.',
            console_id: ps5?.id,
        },
        {
            title: 'Sekiro: Shadows Die Twice',
            developer: 'FromSoftware',
            cover: 'sekiro.jpg',
            releasedate: new Date('2019-03-22'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'Carve your own clever path to victory as the one-armed wolf.',
            console_id: ps5?.id,
        },
        {
            title: 'Demon Souls',
            developer: 'Bluepoint Games',
            cover: 'demon_souls.jpg',
            releasedate: new Date('2020-11-12'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'A remake of the PlayStation classic that defined a genre.',
            console_id: ps5?.id,
        },
        {
            title: 'Returnal',
            developer: 'Housemarque',
            cover: 'returnal.jpg',
            releasedate: new Date('2021-04-30'),
            price: 59.99,
            genre: 'Third-person shooter',
            description: 'Break the cycle of chaos in this third-person roguelike shooter.',
            console_id: ps5?.id,
        },
        {
            title: 'Ratchet and Clank Rift Apart',
            developer: 'Insomniac Games',
            cover: 'ratchet_rift_apart.jpg',
            releasedate: new Date('2021-06-11'),
            price: 69.99,
            genre: 'Platform',
            description: 'Jump between realities and discover new worlds.',
            console_id: ps5?.id,
        },
        {
            title: 'Horizon Forbidden West',
            developer: 'Guerrilla Games',
            cover: 'horizon_fw.jpg',
            releasedate: new Date('2022-02-18'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'Aloy explores a lush but dangerous frontier in the far future.',
            console_id: ps5?.id,
        },
        {
            title: 'Ghost of Tsushima',
            developer: 'Sucker Punch Productions',
            cover: 'ghost_tsushima.jpg',
            releasedate: new Date('2020-07-17'),
            price: 49.99,
            genre: 'Action-adventure',
            description: 'Become a samurai to save feudal Japan from a Mongol invasion.',
            console_id: ps5?.id,
        },
        {
            title: 'Final Fantasy XVI',
            developer: 'Square Enix',
            cover: 'ff16.jpg',
            releasedate: new Date('2023-06-22'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'An action-packed dark fantasy set in the world of Valisthea.',
            console_id: ps5?.id,
        },
        {
            title: 'Baldurs Gate 3',
            developer: 'Larian Studios',
            cover: 'bg3.jpg',
            releasedate: new Date('2023-08-03'),
            price: 69.99,
            genre: 'Role-playing',
            description: 'Gather your party and return to the Forgotten Realms.',
            console_id: ps5?.id,
        },
        {
            title: 'Alan Wake 2',
            developer: 'Remedy Entertainment',
            cover: 'alan_wake2.jpg',
            releasedate: new Date('2023-10-27'),
            price: 59.99,
            genre: 'Survival horror',
            description: 'A mind-bending psychological thriller set in the dark world of nightmares.',
            console_id: ps5?.id,
        },
        {
            title: 'Lies of P',
            developer: 'Round8 Studio',
            cover: 'lies_of_p.jpg',
            releasedate: new Date('2023-09-19'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'A soulslike retelling of the tale of Pinocchio.',
            console_id: ps5?.id,
        },
        {
            title: 'Street Fighter 6',
            developer: 'Capcom',
            cover: 'sf6.jpg',
            releasedate: new Date('2023-06-02'),
            price: 59.99,
            genre: 'Fighting',
            description: 'The legendary fighting franchise returns with a bold new look.',
            console_id: ps5?.id,
        },
        {
            title: 'Mortal Kombat 1',
            developer: 'NetherRealm Studios',
            cover: 'mk1.jpg',
            releasedate: new Date('2023-09-19'),
            price: 69.99,
            genre: 'Fighting',
            description: 'Liu Kang resets the timeline and creates a new universe.',
            console_id: xbox?.id,
        },
        {
            title: 'Diablo IV',
            developer: 'Blizzard Entertainment',
            cover: 'diablo4.jpg',
            releasedate: new Date('2023-06-06'),
            price: 69.99,
            genre: 'Action role-playing',
            description: 'The armies of Hell have invaded Sanctuary. Fight back.',
            console_id: xbox?.id,
        },
        {
            title: 'Fortnite',
            developer: 'Epic Games',
            cover: 'fortnite.jpg',
            releasedate: new Date('2017-07-25'),
            price: 0,
            genre: 'Battle royale',
            description: 'Drop in, loot up, and be the last one standing.',
            console_id: xbox?.id,
        },
        {
            title: 'Apex Legends',
            developer: 'Respawn Entertainment',
            cover: 'apex_legends.jpg',
            releasedate: new Date('2019-02-04'),
            price: 0,
            genre: 'Battle royale',
            description: 'Legendary characters with powerful abilities battle to be the last squad standing.',
            console_id: xbox?.id,
        },
        {
            title: 'Destiny 2',
            developer: 'Bungie',
            cover: 'destiny2.jpg',
            releasedate: new Date('2017-09-06'),
            price: 0,
            genre: 'First-person shooter',
            description: 'Become a Guardian and defend humanity from alien threats.',
            console_id: xbox?.id,
        },
        {
            title: 'Sea of Thieves',
            developer: 'Rare',
            cover: 'sea_of_thieves.jpg',
            releasedate: new Date('2018-03-20'),
            price: 39.99,
            genre: 'Action-adventure',
            description: 'A shared-world pirate adventure game.',
            console_id: xbox?.id,
        },
        {
            title: 'Ori and the Will of the Wisps',
            developer: 'Moon Studios',
            cover: 'ori_wisps.jpg',
            releasedate: new Date('2020-03-11'),
            price: 29.99,
            genre: 'Platform',
            description: 'A visually stunning platformer about a spirit guardian.',
            console_id: xbox?.id,
        },
        {
            title: 'Psychonauts 2',
            developer: 'Double Fine Productions',
            cover: 'psychonauts2.jpg',
            releasedate: new Date('2021-08-25'),
            price: 39.99,
            genre: 'Platform',
            description: 'Raz returns as a full-fledged Psychonaut agent.',
            console_id: xbox?.id,
        },
        {
            title: 'A Plague Tale Requiem',
            developer: 'Asobo Studio',
            cover: 'plague_tale_requiem.jpg',
            releasedate: new Date('2022-10-18'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'Amicia and Hugo flee their homeland in search of a cure.',
            console_id: xbox?.id,
        },
        {
            title: 'Hi-Fi Rush',
            developer: 'Tango Gameworks',
            cover: 'hifi_rush.jpg',
            releasedate: new Date('2023-01-25'),
            price: 29.99,
            genre: 'Rhythm action',
            description: 'Rock out and defeat evil in this rhythm-based action game.',
            console_id: xbox?.id,
        },
        {
            title: 'Redfall',
            developer: 'Arkane Austin',
            cover: 'redfall.jpg',
            releasedate: new Date('2023-05-02'),
            price: 69.99,
            genre: 'First-person shooter',
            description: 'Fight a legion of vampires in an open-world co-op shooter.',
            console_id: xbox?.id,
        },
        {
            title: 'Lies of P',
            developer: 'Round8 Studio',
            cover: 'lies_of_p_xbox.jpg',
            releasedate: new Date('2023-09-19'),
            price: 59.99,
            genre: 'Action role-playing',
            description: 'A soulslike retelling of the tale of Pinocchio.',
            console_id: xbox?.id,
        },
        {
            title: 'Splatoon 3',
            developer: 'Nintendo EPD',
            cover: 'splatoon3.jpg',
            releasedate: new Date('2022-09-09'),
            price: 59.99,
            genre: 'Third-person shooter',
            description: 'Ink-based battles return with new weapons and modes.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Metroid Dread',
            developer: 'MercurySteam',
            cover: 'metroid_dread.jpg',
            releasedate: new Date('2021-10-08'),
            price: 59.99,
            genre: 'Action-adventure',
            description: 'Samus Aran faces her most terrifying mission yet.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Kirby and the Forgotten Land',
            developer: 'HAL Laboratory',
            cover: 'kirby_forgotten_land.jpg',
            releasedate: new Date('2022-03-25'),
            price: 59.99,
            genre: 'Platform',
            description: 'Kirby embarks on a 3D adventure through a mysterious post-apocalyptic world.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Fire Emblem Engage',
            developer: 'Intelligent Systems',
            cover: 'fire_emblem_engage.jpg',
            releasedate: new Date('2023-01-20'),
            price: 59.99,
            genre: 'Tactical role-playing',
            description: 'Summon legendary heroes and fight to save the continent of Elyos.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Xenoblade Chronicles 3',
            developer: 'Monolith Soft',
            cover: 'xenoblade3.jpg',
            releasedate: new Date('2022-07-29'),
            price: 59.99,
            genre: 'Role-playing',
            description: 'Two opposing nations clash in a world where life lasts only ten years.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Bayonetta 3',
            developer: 'PlatinumGames',
            cover: 'bayonetta3.jpg',
            releasedate: new Date('2022-10-28'),
            price: 59.99,
            genre: 'Action',
            description: 'The witch is back in an all-new multiverse-spanning adventure.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Pikmin 4',
            developer: 'Nintendo EPD',
            cover: 'pikmin4.jpg',
            releasedate: new Date('2023-07-21'),
            price: 59.99,
            genre: 'Real-time strategy',
            description: 'Lead a pack of Pikmin and explore a mysterious planet.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Super Mario Bros Wonder',
            developer: 'Nintendo EPD',
            cover: 'smb_wonder.jpg',
            releasedate: new Date('2023-10-20'),
            price: 59.99,
            genre: 'Platform',
            description: 'A fresh take on 2D Mario with mind-bending Wonder effects.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Animal Crossing New Horizons',
            developer: 'Nintendo EPD',
            cover: 'acnh.jpg',
            releasedate: new Date('2020-03-20'),
            price: 59.99,
            genre: 'Life simulation',
            description: 'Escape to a deserted island and create your own paradise.',
            console_id: switchOLED?.id,
        },
        {
            title: 'Hades',
            developer: 'Supergiant Games',
            cover: 'hades.jpg',
            releasedate: new Date('2020-09-17'),
            price: 24.99,
            genre: 'Roguelike',
            description: 'Defy the god of the dead as you hack and slash out of the Underworld.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Stardew Valley',
            developer: 'ConcernedApe',
            cover: 'stardew_valley.jpg',
            releasedate: new Date('2016-02-26'),
            price: 14.99,
            genre: 'Life simulation',
            description: 'Build the farm of your dreams in this beloved indie classic.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Hollow Knight',
            developer: 'Team Cherry',
            cover: 'hollow_knight.jpg',
            releasedate: new Date('2017-02-24'),
            price: 14.99,
            genre: 'Metroidvania',
            description: 'Forge your own path through a vast ruined kingdom of insects.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Deep Rock Galactic',
            developer: 'Ghost Ship Games',
            cover: 'deep_rock.jpg',
            releasedate: new Date('2020-05-13'),
            price: 29.99,
            genre: 'Co-op shooter',
            description: 'Space dwarves mine, fight, and survive in procedurally generated caves.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Vampire Survivors',
            developer: 'poncle',
            cover: 'vampire_survivors.jpg',
            releasedate: new Date('2022-10-20'),
            price: 4.99,
            genre: 'Roguelike',
            description: 'Survive endless waves of monsters in this addictive bullet-hell.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Dave the Diver',
            developer: 'Mintrocket',
            cover: 'dave_diver.jpg',
            releasedate: new Date('2023-06-28'),
            price: 19.99,
            genre: 'Adventure',
            description: 'Dive the ocean by day and run a sushi restaurant by night.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Cult of the Lamb',
            developer: 'Massive Monster',
            cover: 'cult_of_lamb.jpg',
            releasedate: new Date('2022-08-11'),
            price: 24.99,
            genre: 'Roguelike',
            description: 'Start a cult, build a community, and vanquish enemies.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Disco Elysium',
            developer: 'ZA/UM',
            cover: 'disco_elysium.jpg',
            releasedate: new Date('2019-10-15'),
            price: 39.99,
            genre: 'Role-playing',
            description: 'A groundbreaking open-world detective RPG with no combat.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Monster Hunter Rise',
            developer: 'Capcom',
            cover: 'mh_rise.jpg',
            releasedate: new Date('2021-03-26'),
            price: 39.99,
            genre: 'Action role-playing',
            description: 'Hunt fearsome monsters using new acrobatic abilities.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Persona 5 Royal',
            developer: 'Atlus',
            cover: 'persona5_royal.jpg',
            releasedate: new Date('2020-03-31'),
            price: 59.99,
            genre: 'Role-playing',
            description: 'Wear the mask, awaken your Persona, and fight back against injustice.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Celeste',
            developer: 'Maddy Makes Games',
            cover: 'celeste.jpg',
            releasedate: new Date('2018-01-25'),
            price: 19.99,
            genre: 'Platform',
            description: 'Help Madeline survive her inner demons on her journey to the top of Celeste Mountain.',
            console_id: steamDeck?.id,
        },
        {
            title: 'Tunic',
            developer: 'Andrew Shouldice',
            cover: 'tunic.jpg',
            releasedate: new Date('2022-03-16'),
            price: 29.99,
            genre: 'Action-adventure',
            description: 'Explore a land full of lost legends, ancient powers, and hidden secrets.',
            console_id: switch2?.id,
        },
    ]

    for (const game of gamesData) {
        if (!game.console_id) continue

        await prisma.games.create({
            data: game,
        })
    }

    console.log('🕹️ 10 games seeded')

    console.log('✅ Seed completed successfully')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })