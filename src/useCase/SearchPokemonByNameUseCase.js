import Fuse from 'fuse.js';

export class SearchPokemonByNameUseCase {
    constructor(pokeApiGateway) {
        this.pokeApiGateway = pokeApiGateway;
    }

    async execute(name) {
        try {
            console.log('SearchPokemonByNameUseCase');
            console.log('name', name);
            const getFullPokemonList = await this.pokeApiGateway.getPokemonList(150, 0);
            const pokemonNames = getFullPokemonList.results.map(pokemon => pokemon.name.toLowerCase());
            console.log('pokemonNames', pokemonNames)
            const fuse = new Fuse(pokemonNames, {
                threshold: 0.3,
                findAllMatches: true,
                shouldSort: true
            })
            console.log('fuse')
            // fuzzy search pokemon name
            const searchResult = fuse.search((name.toLowerCase()));
            console.log('searchResult', searchResult)
            if (searchResult.length === 0) {
                return { error: 'Pokemon not found' };
            }

            let pokemonSet = [];
            for await (const poke of searchResult) {
                const pokemon = await this.pokeApiGateway.getPokemonByIdOrName(poke.item);
                if (!pokemon) return { error: 'Pokemon not found' };
                pokemonSet.push(pokemon);
            }
            // console.log('pokemonSet', pokemonSet)
            return pokemonSet.map((pokemonItem) => {
                return {
                    name: pokemonItem.name,
                    id: pokemonItem.id,
                    height: pokemonItem.height,
                    weight: pokemonItem.weight,
                    abilities: pokemonItem.abilities.map(ability => ability.ability.name),
                    types: pokemonItem.types.map(type => type.type.name),
                    stats: pokemonItem.stats.map(stat => {
                        return {
                            name: stat.stat.name,
                            base_stat: stat.base_stat
                        }
                    }),
                    image: pokemonItem.sprites.front_default
                }
            });

        } catch (error) {
            return { error: error.message };
        }
    }
}