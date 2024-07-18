import { UnFavoritePokemonByIdentifierUseCase } from "../../useCase/UnFavoritePokemonByIdentifierUseCase.js";

export class PokemonUnfavoriteByIdController {
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let pokemonId = req.params.id;
            const unfavoritePokemonUseCase = new UnFavoritePokemonByIdentifierUseCase(this.pokemonRepository);
            const useCaseResponse = await unfavoritePokemonUseCase.execute(pokemonId);
            return res.status(200).json(useCaseResponse);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}