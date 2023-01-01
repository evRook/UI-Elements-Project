console.log('Hello World')

let genOne = document.querySelector('.js-gen1--container') //gets page container
let modal = document.querySelector('.js-modal')
let modalContainer = document.querySelector('.js-modal--container')
let normalSprite = document.getElementById('img1')
let shinySprite = document.getElementById('img2')
let name = document.querySelector('.js-name')
let type = document.querySelector('.js-type')
let height = document.querySelector('.js-height')
let weight = document.querySelector('.js-weight')
let abilities = document.querySelector('.js-normalAbilities')
let hiddenAbilities = document.querySelector('.js-hiddenAbilities')
let closeBtn = document.querySelector('.js-closeBtn')
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


    if(data.types.length < 2){
        let firstType = data.types[0].type.name
        type.innerText = `Type: ${firstType}`
    }else{
        let firstType = data.types[0].type.name
        let secondType = data.types[1].type.name
        type.innerText = `Type: ${firstType}, ${secondType}`
    }


    height.innerText = `Height: ${data.height / 10}m`
    weight.innerText = `Weight: ${data.weight / 10}kg`


    for(q = 0; q < data.abilities.length; q++){
        if(data.abilities[q].is_hidden == false && data.abilities.length > 2){
            let firstAbility = data.abilities[0].ability.name
            let secondAbility = data.abilities[1].ability.name
            abilities.innerText = `Ability: ${firstAbility}, ${secondAbility}`
        }else if(data.abilities[q].is_hidden == true && data.abilities.length > 2){
            let firstAbility = data.abilities[2].ability.name
            hiddenAbilities.innerText = `Hidden Ability: ${firstAbility}`
        }else if(data.abilities[q].is_hidden == false && data.abilities.length < 3 ){
            let firstAbility = data.abilities[0].ability.name
            abilities.innerText = `Ability: ${firstAbility}`
        }else if(data.abilities[q].is_hidden == true && data.abilities.length < 3){
            let secondAbility = data.abilities[1].ability.name
            hiddenAbilities.innerText = `Hidden Ability: ${secondAbility}`
        }
    }

}


closeBtn.addEventListener('click', closeModal => {
    modalContainer.classList.remove('js-visible--modal__container')
    modal.classList.remove('js-visible--modal')
})
