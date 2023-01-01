console.log('Hello World')

fetch(`https://pokeapi.co/api/v2/pokemon/6`)
    .then(res => res.json())
    .then(response => console.log(response))

let genOneImg = document.querySelectorAll('.gen1--img')

for(i=0; i<genOneImg.length; i++){
    genOneImg[i].innerText = `test${i}`
}