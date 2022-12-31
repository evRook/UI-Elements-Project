console.log('Hello World')

fetch("https://pokeapi.co/api/v2/pokemon/6")
.then(res => res.json())
.then(response => console.log(response))