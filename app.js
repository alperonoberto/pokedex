const searchTerm = document.getElementById('input');
const searchBtn = document.getElementById('buscar');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');


const searchPokemon = (event) => {
    event.preventDefault();
    const pokemon = searchTerm.value;
    fetchPokemon(pokemon.toString().toLowerCase());
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

    localStorage.setItem('pokeId', id);

    const div = document.getElementById('container');
    const pokeName = document.createElement('div');
    const pokeImage = document.createElement('img');
    const pokeId = document.createElement('div');

    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);

    div.style.backgroundColor = randomColor;

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

    renderPokeStats(data);

}

const renderPokeStats = data => {
    const divTypes = document.createElement('div');
    divTypes.classList.add('types');

    const divStats = document.createElement('div');
    divStats.classList.add('stats');

    const div = document.getElementById('container');

    div.appendChild(divTypes);
    div.appendChild(divStats);

    const types = [];
    for(let i = 0; i < data.types.length; i++){
        types.push(data.types[i].type.name);
    }
    
    types.forEach((type) => {
        const text = document.createElement('img');
        // text.textContent = type;
        text.setAttribute('src', `./images/typesPNG/${type}.png`)
        divTypes.appendChild(text);
    });

    const hp = data.stats[0].base_stat;
    const attack = data.stats[1].base_stat;
    const defense = data.stats[2].base_stat;
    const speed = data.stats[5].base_stat;

    const hpName = document.createElement('p');
    hpName.textContent = `HP ${hp}`;
    divStats.appendChild(hpName);

    const attackName = document.createElement('p');
    attackName.textContent = `Attack ${attack}`;
    divStats.appendChild(attackName);

    const defenseName = document.createElement('p');
    defenseName.textContent = `Defense ${defense}`;
    divStats.appendChild(defenseName);

    const speedName = document.createElement('p');
    speedName.textContent = `Speed ${speed}`;
    divStats.appendChild(speedName);
}

fetchPokemon('1');

function removePokemon() {
    const prevDiv = document.getElementById('container');
    prevDiv.outerHTML = '';
    const newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'container');
    document.body.appendChild(newDiv);
}

const nextPokemon = () => {
    const actualId = localStorage.getItem('pokeId');
    var actualIdNum = parseInt(actualId);
    actualIdNum++;
    removePokemon(actualId);
    fetchPokemon(actualIdNum);
}

const prevPokemon = () => {
    const actualId = localStorage.getItem('pokeId');
    var actualIdNum = parseInt(actualId);
    actualIdNum--;
    removePokemon(actualId);
    fetchPokemon(actualIdNum);
}

nextBtn.addEventListener('click', nextPokemon);
prevBtn.addEventListener('click', prevPokemon);











