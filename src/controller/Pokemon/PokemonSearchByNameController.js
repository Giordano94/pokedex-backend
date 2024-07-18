import { SearchPokemonByNameUseCase } from "../../useCase/SearchPokemonByNameUseCase.js";

export class PokemonSearchByNameController {
    constructor(pokeApiGateway) {
        this.pokeApiGateway = pokeApiGateway;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let pokemonName = req.params.name;
            if (!pokemonName) return res.status(400).json({ error: 'Pokemon name is required' });
            const searchPokemonByNameUseCase = new SearchPokemonByNameUseCase(this.pokeApiGateway);
            const pokemonList = await searchPokemonByNameUseCase.execute(pokemonName);
            return res.status(200).json(pokemonList);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}