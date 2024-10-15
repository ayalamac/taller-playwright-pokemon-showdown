import { Pokemon } from "./pokemon.type";

export interface PokemonTeam {
    name    : string;
    format  : PokemonTeamFormat;
    pokemons: Array<Pokemon>;
}

export interface PokemonTeamFormat {
    generation: string;
    name      : string;
}