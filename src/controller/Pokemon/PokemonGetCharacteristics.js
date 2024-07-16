export class PokemonGetCharacteristicsController {
    constructor(pokeApiGateway) {
        this.pokeApiGateway = pokeApiGateway;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let pokemonId = req.params.id;
            if (!pokemonId) return res.status(400).json({ error: 'Pokemon ID is required' });

            const pokemonList = await this.pokeApiGateway.getPokemonCharacteristic(pokemonId);
            return res.status(200).json(pokemonList);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}