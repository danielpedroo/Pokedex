
//Esta classe ficara responsavel por manipular dados;
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokemonDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetail.id;
    pokemon.name = pokemonDetail.name

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetail.sprites.other.dream_world.front_default
    return pokemon

}

//Esta function busca os detalhes do pokemon
pokeApi.getPokemonDetails = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
}

//Função que consome a API
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        //results -> resultado da conversao JsonBody.results;
        .then((jsonBody) => jsonBody.results)
        //Este callback esta fazendo uma nova lista em json dos detalhes do pokemon via url
        .then((pokemons) => pokemons.map((pokeApi.getPokemonDetails)))
        //Este callback esta pegando os detalhes e esperando a promessa por completo, por isso o Promisse.all
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
}
