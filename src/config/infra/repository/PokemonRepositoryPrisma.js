import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class PokemonRepositoryPrisma {
    async findAll(limit, offset) {
        return prisma.favorite.findMany({
            take: limit,
            skip: offset
        })
            .catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)
            }).finally(async () => {
                await prisma.$disconnect()
            })
    }

    async favoritePokemon(pokemonId) {
        return prisma.favorite.create(
            {
                data: {
                    pokemonIdentifier: pokemonId
                }
            }
        )
            .then(async () => {
                await prisma.$disconnect()
            })
            .catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)
            })
    }

    async unFavoritePokemon(pokemonId) {
        return prisma.favorite.delete({
            where: { pokemonIdentifier: pokemonId }
        }).then(async () => {
            await prisma.$disconnect()
        })
            .catch(async (e) => {
                await prisma.$disconnect()
                process.exit(1)
            })
    }

    async getOneFavoritePokemon(pokemonId) {
        return await prisma.favorite.findUnique({
            where: { pokemonIdentifier: pokemonId }
        }).catch(async (e) => {
            await prisma.$disconnect()
            process.exit(1)
        }).finally(async () =>
            await prisma.$disconnect()
        );
    }
}