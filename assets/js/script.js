const inputSearch = document.querySelector('#input-search');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const form = document.querySelector('#form');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  if (isNaN(pokemon)) {
    pokemon.toLowerCase();
  }

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }

  return;
}

const renderPokemon = async (pokemon) => {
  const pokemonNumber = document.querySelector('#pokemon-number');
  const pokemonName = document.querySelector('#pokemon-name');

  pokemonNumber.innerHTML = '';
  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);
  const pokemonImage = document.querySelector('#pokemon-image');

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
  
    inputSearch.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Not found :/';
    searchPokemon = 1;
  }
}

prevButton.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon--;
    renderPokemon(searchPokemon);
  }
});

nextButton.addEventListener('click', () => {
  searchPokemon++;
  renderPokemon(searchPokemon);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  renderPokemon(inputSearch.value);
});

renderPokemon(searchPokemon);