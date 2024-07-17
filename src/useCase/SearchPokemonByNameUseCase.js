import Fuse from 'fuse.js';
import { pokemonAdapter } from '../config/adapters/pokemonAdapterDto.js';

export class SearchPokemonByNameUseCase {
    constructor(pokeApiGateway) {
        this.pokeApiGateway = pokeApiGateway;
    }

    async execute(name) {
        try {
            const getFullPokemonList = await this.pokeApiGateway.getPokemonList(150, 0);
            const pokemonNames = getFullPokemonList.results.map(pokemon => pokemon.name.toLowerCase());
            const fuse = new Fuse(pokemonNames, {
                threshold: 0.3,
                findAllMatches: true,
                shouldSort: true
            })
            const searchResult = fuse.search((name.toLowerCase()));
            if (searchResult.length === 0) {
                return { error: 'Pokemon not found' };
            }

            let pokemonSet = [];
            for await (const poke of searchResult) {
                const pokemon = await this.pokeApiGateway.getPokemonByIdOrName(poke.item);
                if (!pokemon) return { error: 'Pokemon not found' };
                pokemonSet.push(pokemon);
            }
            return pokemonAdapter(pokemonSet);

        } catch (error) {
            return { error: error.message };
        }
    }
}