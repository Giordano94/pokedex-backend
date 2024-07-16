
import { pokeApiUrl } from '../environment.js';

const pokeApiURL = pokeApiUrl;

export class PokeApiGateway {
    static async getPokemonList(limit, offset) {
        const limitQuery = limit > 0 ? `limit=${limit}&` : '';
        const offsetQuery = offset > 0 ? `offset=${offset}&` : '';
        const urlQuery = pokeApiURL + 'api/v2/pokemon?' + limitQuery + offsetQuery;
        return await fetch(urlQuery).then(async (response) => {
            return await response.json();
        })
    }
    static async getPokemonByIdOrName(idOrName) {
        return await fetch(pokeApiURL + `api/v2/pokemon/${idOrName}`).then(async (response) => {
            return await response.json();
        })
    }
    static async getPokemonCharacteristic(pokemonId) {
        return await fetch(pokeApiURL + `api/v2/characteristic/${pokemonId}`).then(async (response) => {
            return await response.json();
        })
    }
}