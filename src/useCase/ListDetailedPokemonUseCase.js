import { pokemonAdapter } from '../config/adapters/pokemonAdapterDto.js';

export class ListDetailedPokemonUseCase {
  constructor(pokeApiGateway) {
    this.pokeApiGateway = pokeApiGateway;
  }

  async execute(pokemonList) {
    let fetchedPokemonList = [];
    for await (const { name } of pokemonList) {
      const pokemon = await this.pokeApiGateway.getPokemonByIdOrName(name);
      if (pokemon) fetchedPokemonList.push(pokemon);
    }

    return pokemonAdapter(fetchedPokemonList);
  }
}
