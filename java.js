
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

// loop to add img containers
for(k=0; k < 151; k++){
    let newDiv = document.createElement('div');
    newDiv.className = 'gen1--img js-gen1--img';
    genOne.appendChild(newDiv);
}

// function to add images from API to new img containers
async function getPkmn() {
    let genOneImg = document.querySelectorAll('.js-gen1--img') //gets img containers
    for(let i=0; i<genOneImg.length; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);//waits for each element to load before moving on
        let data = await response.json();
        genOneImg[i].style.backgroundImage = `url('${data.sprites.front_default}')`;
    }
}
getPkmn();

// referanced here because they dont exist untill after creation loop
let imgBtn = document.querySelectorAll('.js-gen1--img')

//click listener to open modal and set var 'n' to selection id number
for(let n=0; n<imgBtn.length; n++){
    imgBtn[n].addEventListener('click', openModal => {
        modalContainer.classList.add('js-visible--modal__container')
        modal.classList.add('js-visible--modal')
        num = n + 1
        modalContent();
    })
}

//function to add content to modal from API
async function modalContent() {
    //fetches API
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`);
    let data = await response.json();

    //changes modal images to new images from API
    normalSprite.style.backgroundImage = `url('${data.sprites.front_default}')`
    shinySprite.style.backgroundImage = `url('${data.sprites.front_shiny}')`

    //statement to add zeros infront of id based on id length
    if(data.id < 10){
        //changes inner text to selection id and name from API
        name.innerText = `00${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }else if(data.id > 9 && data.id < 100){
        name.innerText = `0${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }else{
        name.innerText = `${data.id} ${data.name}`
        name.style.textTransform = 'uppercase'
    }

    //argument to check for multiple typings
    if(data.types.length < 2){
        //changes inner text to selecton type
        let firstType = data.types[0].type.name
        type.innerText = `Type: ${firstType}`
    }else{
        let firstType = data.types[0].type.name
        let secondType = data.types[1].type.name
        type.innerText = `Type: ${firstType}, ${secondType}`
    }

    // chages height and weight inner text from API
    height.innerText = `Height: ${data.height / 10}m`
    weight.innerText = `Weight: ${data.weight / 10}kg`

    // argument to check if abillity is hidden or not and if there are multiple normal abilities
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

// click listener to close modal
closeBtn.addEventListener('click', closeModal => {
    modalContainer.classList.remove('js-visible--modal__container')
    modal.classList.remove('js-visible--modal')
})
