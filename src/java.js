console.log('Hello World')

let genOne = document.querySelector('.js-gen1--container') //gets page container
let modal = document.querySelector('.js-modal')
let modalContainer = document.querySelector('.js-modal--container')

for(k=0; k < 151; k++){
    let newDiv = document.createElement('div');
    newDiv.className = 'gen1--img js-gen1--img';
    genOne.appendChild(newDiv);
}

async function getPkmn(){
    let genOneImg = document.querySelectorAll('.js-gen1--img') //gets img containers
    for(i=0; i<genOneImg.length; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
        let data = await response.json();
        genOneImg[i].style.backgroundImage = `url('${data.sprites.front_default}')`;
    }
}
getPkmn();

let imgBtn = document.querySelectorAll('.js-gen1--img')

for(let n=0; n<imgBtn.length; n++){
    imgBtn[n].addEventListener('click', openModal => {
        modalContainer.classList.add('js-visible--modal__container')
        modal.classList.add('js-visible--modal')
    })

}

