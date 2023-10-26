


 
async function fetchAllPokemon() {
    const pokemonContainer = document.getElementById('pokemon-list');
 
    for (let i = 1; i <= totalPokemon; i++) {
        const pokemonUrl = `${apiUrl}${i}`;
        try {
            const response = await fetch(pokemonUrl);
            if (!response.ok) {
                throw new Error('Erro na requisição à API');
            }
            const pokemonData = await response.json();
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
            `;
            pokemonContainer.appendChild(pokemonCard);
        } catch (error) {
            console.error(`Erro ao recuperar dados do Pokémon ${i}`, error);
        }
    }
}
 
// Chame a função para buscar todos os 1208 Pokémon
fetchAllPokemon();

document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.toLowerCase();
 
    fetch(apiUrl + searchInput)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado!');
            }
            return response.json();
        })
        .then(pokemonData => {
            clearPokemonList();
            createPokemonCard(pokemonData);
        })
        .catch(error => {
            console.error(error.message);
        });
});
 
function clearPokemonList() {
    const pokemonContainer = document.getElementById('pokemon-list');
    pokemonContainer.innerHTML = '';
}
 
function createPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemon-list');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
<img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
<p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
    `;
    pokemonContainer.appendChild(pokemonCard);
}
document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search').value.toLowerCase();
 
    if (searchInput === '') {
        // If the search input is empty, fetch all Pokémon.
        clearPokemonList();
        fetchAllPokemon();
    } else {
        fetch(apiUrl + searchInput)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokémon não encontrado!');
                }
                return response.json();
            })
            .then(pokemonData => {
                clearPokemonList();
                createPokemonCard(pokemonData);
            })
            .catch(error => {
                console.error(error.message);
            });
    }
});
function createPokemonCard(pokemonData) {
    const pokemonContainer = document.getElementById('pokemon-list');
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    
    const types = pokemonData.types.map(type => type.type.name).join(', ');
    const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
    
    pokemonCard.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
        <p>ID: ${pokemonData.id}</p>
        <p>Altura: ${pokemonData.height} dm</p>
        <p>Peso: ${pokemonData.weight} hg</p>
        <p>Tipos: ${types}</p>
        <p>Habilidades: ${abilities}</p>
    `;
    
    pokemonContainer.appendChild(pokemonCard);
}
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let totalPokemon = 20; // Change this to the initial number of Pokémon to load
let pokemonOffset = 0; // Track the number of Pokémon already loaded
const pokemonContainer = document.getElementById('pokemon-list');

async function fetchMorePokemon() {
  // Calculate the offset for the next batch of Pokémon to load
  const newOffset = pokemonOffset + totalPokemon;

  for (let i = pokemonOffset + 1; i <= newOffset; i++) {
    const pokemonUrl = `${apiUrl}${i}`;
    try {
      const response = await fetch(pokemonUrl);
      if (!response.ok) {
        throw new Error('Error fetching Pokémon data');
      }
      const pokemonData = await response.json();
      createPokemonCard(pokemonData);
    } catch (error) {
      console.error(`Error fetching Pokémon data for ID ${i}`, error);
    }
  }

  // Update the offset for the next batch
  pokemonOffset = newOffset;
}

// Function to create a Pokémon card
function createPokemonCard(pokemonData) {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');
  
  const types = pokemonData.types.map(type => type.type.name).join(', ');
  const abilities = pokemonData.abilities.map(ability => ability.ability.name).join(', ');
  
  pokemonCard.innerHTML = `
      <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
      <p>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</p>
      <p>ID: ${pokemonData.id}</p>
      <p>Altura: ${pokemonData.height} dm</p>
      <p>Peso: ${pokemonData.weight} hg</p>
      <p>Tipos: ${types}</p>
      <p>Habilidades: ${abilities}</p>
  `;
  
  pokemonContainer.appendChild(pokemonCard);
}

// Load the initial batch of Pokémon
fetchMorePokemon();

// Add an event listener to the "Load More Pokémon" button
const loadMoreButton = document.getElementById('load-more-button');
loadMoreButton.addEventListener('click', () => {
  fetchMorePokemon();
});






