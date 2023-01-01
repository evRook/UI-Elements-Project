console.log('Hello World')

// fetch(`https://pokeapi.co/api/v2/pokemon/6`)
//     .then(response => response.json())
//     .then(response => console.log(response))

let genOneImg = document.querySelectorAll('.gen1--img') //gets img containers
let pkmnName = document.querySelector('.gen1--name')


// for(i=1; i<genOneImg.length + 1; i++){
//     fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(error => console.log('error'))
// }

for(i=1; i<genOneImg.length + 1; i++){
    async function getPkmn(){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        let data = await response.json();
        console.log(data.name)
    }
    getPkmn();
}
