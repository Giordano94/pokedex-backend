import { ListDetailedPokemonUseCase } from '../../useCase/ListDetailedPokemonUseCase.js';

export class PokemonListController {
  constructor(pokeApiGateway) {
    this.pokeApiGateway = pokeApiGateway;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res) {
    try {
      let limit = req.query.limit || 150;
      let offset = req.query.offset || 0;
      const listDetailedPokemonUseCase = new ListDetailedPokemonUseCase(
        this.pokeApiGateway
      );
      const pokemonList = await this.pokeApiGateway.getPokemonList(
        limit,
        offset
      );
      const response = await listDetailedPokemonUseCase.execute(
        pokemonList.results
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
