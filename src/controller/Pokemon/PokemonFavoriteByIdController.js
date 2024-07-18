import { FavoritePokemonByIdentifierUseCase } from "../../useCase/FavoritePokemonByIdentifierUseCase.js";

export class PokemonFavoriteByIdController {
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let pokemonId = req.params.id;
            if (!pokemonId) return res.status(400).json({ error: 'Pokemon id is required' });
            const favoritePokemonByIdUseCase = new FavoritePokemonByIdentifierUseCase(this.pokemonRepository);
            const useCaseResponse = await favoritePokemonByIdUseCase.execute(pokemonId);
            if (useCaseResponse === null) return res.status(400).json({ error: 'Pokemon already favorited' });
            return res.status(200).json(useCaseResponse);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}