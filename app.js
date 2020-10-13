const searchInput = document.querySelector(".recherche-poke input")
let allPokemon =[]
let tableauFin = []
function fetchPokemonBase() {

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then(blob => blob.json())
    .then(data => {
        data.results.forEach((element) => {
            fetchPokemonComplet(element)
        });
    })

}
fetchPokemonBase()

function fetchPokemonComplet(element) {
    let objPokemonFull = {}
    let url = element.url
    let nameP = element.name

    fetch(url) 
    .then(reponse => reponse.json())
    .then((pokeData) => {
        objPokemonFull.pic = pokeData.sprites.front_default
        objPokemonFull.type = pokeData.types[0].type.name

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
        .then(reponse => reponse.json())
        .then((pokeData) => {
            objPokemonFull.name = pokeData.names[4].name
            allPokemon.push(objPokemonFull)

            if(allPokemon.length === 151) {
                console.log(allPokemon);
            }
        })

    })
}

searchInput.addEventListener("input" ,(e) => {
    if(e.target.value !== "") {
        e.target.parentNode.classList.add("active-input")
    } else if (e.target.value === "") {
        e.target.parentNode.classList.add("active-input")
    }
})