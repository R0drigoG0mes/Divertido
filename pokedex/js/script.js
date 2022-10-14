const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

let searchPokemon = 1;
let traco = ' - ';

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = 'Loading... <img src="favicons/favicon-16x16.png" class="gira">';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id + traco;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];

    input.value = '';
    searchPokemon = data.id;
    }
    else{
        pokemonImage.style.display = "none";
        pokemonName.innerHTML = 'Texto Inválido';
        pokemonNumber.innerHTML = '? ';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value ='';
});

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1)
    {searchPokemon -= 1;
    renderPokemon(searchPokemon);}

});

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

