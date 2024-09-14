import { Pokemon } from "../types/pokemonTypes";

export async function fetchPokemon(
  pokemonName: string | number
): Promise<Pokemon | undefined> {
  try {
    pokemonName = pokemonName.toString();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    const data = await response.json();
    const description = await fetchPokemonDescription(data.name);

    const pokemon = {
      name: data.name,
      id: data.id,
      height: data.height,
      weight: data.weight,
      image:
        data.sprites.other["official-artwork"]["front_default"] ||
        data.sprites["front_default"],
      types: data.types.map((e) => e.type.name),
      imageShiny: data.sprites.other["official-artwork"]["front_shiny"] || null,
      stats: data.stats.map((e) => ({
        base_stat: e.base_stat,
        name: e.stat.name,
      })),
      abilities: data.abilities.map((e) => e.ability.name),
      description: description || null,
    };
    return pokemon;
  } catch (error) {
    console.error("Error fetching pokemon data:", error);
    throw new Error("Failed to fetch pokemon");
  }
}

async function fetchPokemonDescription(name: string): Promise<string> {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );
  const data = await response.json();

  const description = data?.flavor_text_entries[0]?.flavor_text;
  return description;
}
