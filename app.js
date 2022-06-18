const searchTerm = document.getElementById('input');
const searchBtn = document.getElementById('buscar');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const nextPokemon = () => {
    const id = document.getElementsByClassName('pokeId').childNode;
    console.log(id);
}

nextBtn.addEventListener('click', nextPokemon);

const searchPokemon = (event) => {
    event.preventDefault();
    const pokemon = searchTerm.value;
    fetchPokemon(pokemon.toString());
    removePokemon();
}

const fetchPokemon = async (pokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const data = await response.json();
    renderPokemon(data);
}


const renderPokemon = (data) => {
    const sprite = data.sprites.front_default;
    const name = data.name;
    const id = data.id.toString();

    const div = document.getElementById('container');
    const pokeName = document.createElement('div');
    const pokeImage = document.createElement('img');
    const pokeId = document.createElement('div');

    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    div.style.backgroundColor = randomColor;

    console.log(div);

    pokeName.classList.add('pokeName');
    pokeImage.classList.add('pokeImage');
    pokeId.classList.add('pokeId');

    div.appendChild(pokeName);
    div.appendChild(pokeImage);
    div.appendChild(pokeId);

    pokeName.textContent = name;
    pokeImage.setAttribute('src', sprite);
    pokeId.textContent = `#${id.padStart(3, '0')}`;
    

    const width = 60;
    const height = 32;

    pokeImage.setAttribute('width', width);
    pokeImage.setAttribute('height', height);

}

fetchPokemon('1');

function removePokemon() {
    const prevDiv = document.getElementById('container');
    prevDiv.outerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'container');
    document.body.appendChild(newDiv);
}












