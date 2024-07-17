export function pokemonAdapter(pokemonSet) {
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
            gif: pokemonItem.sprites.other.showdown.front_default,
            image: pokemonItem.sprites.other.home.front_default,
            shinyImage: pokemonItem.sprites.other.home.front_shiny,
        }
    });
}