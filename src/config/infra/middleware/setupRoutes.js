import { pokeApiRoutes } from '../routes/PokeApiRoutes.js';
import { pokemonRoutes } from '../routes/PokemonRoutes.js';

export function setupMiddlewareRoutes(server) {
    server.use('/pokeapi', pokeApiRoutes);
    server.use('/pokemon', pokemonRoutes);
}