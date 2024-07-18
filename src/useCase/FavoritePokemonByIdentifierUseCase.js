export class FavoritePokemonByIdentifierUseCase {
    constructor(pokemonRepository) {
        this.pokemonRepository = pokemonRepository
    }

    async execute(pokemonId) {
        const isPokemonFavorite = await this.pokemonRepository.getOneFavoritePokemon(pokemonId);
        if (isPokemonFavorite) return null;
        return this.pokemonRepository.favoritePokemon(pokemonId)
    }
}