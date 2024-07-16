import { Router } from 'express';
import { PokemonListController } from '../../../controller/Pokemon/PokemonListController.js';
import { PokemonGetCharacteristicsController } from '../../../controller/Pokemon/PokemonGetCharacteristics.js';
import { PokemonSearchByNameController } from '../../../controller/Pokemon/PokemonSearchByNameController.js';
import { PokemonSearchByIdController } from '../../../controller/Pokemon/PokemonSearchByIdController.js';
import { PokeApiGateway } from '../gateway/pokeApiGateway.js';

const pokemonRoutes = Router();

const pokemonListController = new PokemonListController(PokeApiGateway);
const pokemonSearchByNameController = new PokemonSearchByNameController(PokeApiGateway);
const pokemonSearchByIdController = new PokemonSearchByIdController(PokeApiGateway);
const pokemonGetCharacteristicsController = new PokemonGetCharacteristicsController(PokeApiGateway);

pokemonRoutes.get('/list', pokemonListController.handle);
pokemonRoutes.get('/characteristics/:id', pokemonGetCharacteristicsController.handle);
pokemonRoutes.get('/searchByName/:name', pokemonSearchByNameController.handle);
pokemonRoutes.get('/searchById/:pokemonId', pokemonSearchByIdController.handle);

export { pokemonRoutes };