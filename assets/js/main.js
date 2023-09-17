const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const search = document.getElementById('search')
const number = document.getElementById('number')
const pokemonImage = document.getElementById('pokemon-image')
const type = document.querySelectorAll('.type')
const types = document.getElementById('types')
const statNumber = document.getElementsByClassName('stat-number')

const maxRecords = 151
const limit = 10
let offset = 0;

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
    </li>
    `
}

search.addEventListener('change', async (event) => {
   const jsonBody = await pokeApi.getPokemonCardDetail(event.target.value)

   if(!jsonBody) alert("Ookemon does not exist.")
   console.log(jsonBody)

    number.innerHTML = '#' + jsonBody.id.toString().padStart(3, '0');

    pokemonImage.src = jsonBody.sprites.other.dream_world.front_default;

    types.innerHTML = '';

    jsonBody.types.forEach((t) => {
        //console.log(t.type.name)
        let newType = document.createElement('span');
       let color = typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        types.appendChild(newType);
    });
    
    jsonBody.stats.forEach((s, i) => {
        console.log(s)
    })
  
})

function loadPokemonItens(offset, limit) {
 
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})