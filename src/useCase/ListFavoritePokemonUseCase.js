import { pokemonAdapter } from '../config/adapters/pokemonAdapterDto.js';

export class ListFavoritePokemonUseCase {
  constructor(pokemonRepository, pokeApiGateway) {
    this.pokemonRepository = pokemonRepository;
    this.pokeApiGateway = pokeApiGateway;
  }

  async execute(limit, offset) {
    const pokemonIds = await this.pokemonRepository.findAll(limit, offset);
    if (!pokemonIds) return null;

    let fetchedPokemonList = [];
    for await (const { pokemonIdentifier } of pokemonIds) {
      const pokemon = await this.pokeApiGateway.getPokemonByIdOrName(
        pokemonIdentifier
      );
      if (pokemon) fetchedPokemonList.push(pokemon);
    }

    return pokemonAdapter(fetchedPokemonList);
  }
}
