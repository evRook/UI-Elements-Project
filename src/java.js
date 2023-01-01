console.log('Hello World')

let genOne = document.querySelector('.js-gen1--container') //gets page container
let modal = document.querySelector('.js-modal')
let modalContainer = document.querySelector('.js-modal--container')

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

async function modalContent(num) {
    let normalSprite = document.getElementById('img1')
    let shinySprite = document.getElementById('img2')
    for(let m=0; m<imgBtn.length; m++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${m+1}`);
        let data = await response.json();
        normalSprite.style.backgroundImage = `url('${data.sprites.front_default}')`;
        shinySprite.style.backgroundImage = `url('${data.sprites.front_shiny}')`;
    }
}

for(let n=0; n<imgBtn.length; n++){
    imgBtn[n].addEventListener('click', openModal => {
        modalContainer.classList.add('js-visible--modal__container')
        modal.classList.add('js-visible--modal')
        modalContent();
    })
}

