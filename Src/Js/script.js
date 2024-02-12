const pokemonsList = document.getElementById('pokemonsList');
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

//Esta função mostra no html os pokemons, ela e movida por pastas da API, tenha isso em mente.
function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">
      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>
      <img
        src="${pokemon.photo}"
        alt="${pokemon.name}"
      />
    </div>
  </li>
    `

  }
  
  function loadPokemonItens(offset, limit) {
  //Este trecho de codigo converte o convertPokemonToLi que e o nosso metodo, que tem html
  // a partir do pokemons.map, e adiciona isto ao nosso antigo html, (inner html);
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonsList.innerHTML += newHtml
  })
}

loadPokemonItens(offset, limit)

//Limitador de geração de pokemons
loadMoreButton.addEventListener('click', () => {
  offset += limit
  const qtdRecordsWithNexPage = offset + limit

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(offset, newLimit)

    //trecho de codigo que remove o button
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(offset, limit)
  }
})


