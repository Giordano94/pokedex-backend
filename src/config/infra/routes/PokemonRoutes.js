import { Router } from 'express';
import { PokemonFavoriteListController } from '../../../controller/Pokemon/PokemonFavoriteListController.js';
import { PokemonRepositoryPrisma } from '../repository/PokemonRepositoryPrisma.js';
import { PokeApiGateway } from '../gateway/pokeApiGateway.js';
import { PokemonFavoriteByIdController } from '../../../controller/Pokemon/PokemonFavoriteByIdController.js';
import { PokemonUnfavoriteByIdController } from '../../../controller/Pokemon/PokemonUnfavoriteByIdController.js';

const pokemonRoutes = Router();
const pokemonRepository = new PokemonRepositoryPrisma();
const pokeApiGateway = new PokeApiGateway();

console.log('controller', pokemonRepository, pokeApiGateway);

const pokemonFavoriteListController = new PokemonFavoriteListController(
  pokemonRepository,
  PokeApiGateway
);
const pokemonFavoriteById = new PokemonFavoriteByIdController(
  pokemonRepository
);
const pokemonUnFavoriteById = new PokemonUnfavoriteByIdController(
  pokemonRepository
);

pokemonRoutes.get('/favorite/list', pokemonFavoriteListController.handle);
pokemonRoutes.patch('/favorite/:id', pokemonFavoriteById.handle);
pokemonRoutes.patch('/favorite/remove/:id', pokemonUnFavoriteById.handle);

export { pokemonRoutes };
