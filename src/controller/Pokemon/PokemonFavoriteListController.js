import { ListFavoritePokemonUseCase } from "../../useCase/ListFavoritePokemonUseCase.js";

export class PokemonFavoriteListController {
    constructor(pokemonRepository, pokeApiGateway) {
        this.pokemonRepository = pokemonRepository;
        this.pokeApiGateway = pokeApiGateway;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let limit = req.query.limit || 10;
            let offset = req.query.offset || 0;
            const listFavoritePokemonListUseCase = new ListFavoritePokemonUseCase(this.pokemonRepository, this.pokeApiGateway);
            const pokemonList = await listFavoritePokemonListUseCase.execute(limit, offset);
            return res.status(200).json(pokemonList);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}