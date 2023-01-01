console.log('Hello World')

let genOne = document.querySelector('.js-gen1--container') //gets page container
let modal = document.querySelector('.js-modal')
let modalContainer = document.querySelector('.js-modal--container')
let normalSprite = document.getElementById('img1')
let shinySprite = document.getElementById('img2')
let name = document.querySelector('.name')
// let type = document.querySelector('.name')
// let height = document.querySelector('.name')
// let weight = document.querySelector('.name')
// let abilities = document.querySelector('.name')
// let hiddenAbilities = document.querySelector('.name')
let num = ''

for(k=0; k < 151; k++){
    let newDiv = document.createElement('div');
    newDiv.className = 'gen1--img js-gen1--img';
    genOne.appendChild(newDiv);
}

async function getPkmn() {
    let genOneImg = document.querySelectorAll('.js-gen1--img') //gets img containers
    for(let i=0; i<genOneImg.length; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
        let data = await response.json();
        console.log(data)
        genOneImg[i].style.backgroundImage = `url('${data.sprites.front_default}')`;
    }
}
getPkmn();

let imgBtn = document.querySelectorAll('.js-gen1--img')

for(let n=0; n<imgBtn.length; n++){
    imgBtn[n].addEventListener('click', openModal => {
        modalContainer.classList.add('js-visible--modal__container')
        modal.classList.add('js-visible--modal')
        num = n + 1
        modalContent();
    })
}

async function modalContent() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    let data = await response.json();
    normalSprite.style.backgroundImage = `url('${data.sprites.front_default}')`
    shinySprite.style.backgroundImage = `url('${data.sprites.front_shiny}')`
    if(data.id < 10){
        name.innerText = `00${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }else if(data.id > 9 && data.id < 100){
        name.innerText = `0${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }else{
        name.innerText = `${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }

}