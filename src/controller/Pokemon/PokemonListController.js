export class PokemonListController {
    constructor(pokeApiGateway) {
        this.pokeApiGateway = pokeApiGateway;
        this.handle = this.handle.bind(this);
    }

    async handle(req, res) {
        try {
            let limit = req.query.limit || 150;
            let offset = req.query.offset || 0;
            const pokemonList = await this.pokeApiGateway.getPokemonList(limit, offset);
            return res.status(200).json(pokemonList);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}