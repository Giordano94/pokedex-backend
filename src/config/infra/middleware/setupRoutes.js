import { pokemonRoutes } from '../routes/PokemonRoutes.js';

export function setupMiddlewareRoutes(server) {
    server.use('/pokeapi', pokemonRoutes);
    // server.use('/favorite', pokemonRoutes);

    // server.use('/characteristic', pokemonRoutes);
    // server.use('/pokemon', pokemonRoutes);
    // server.use('/pokemon', pokemonRoutes);
}