console.log('Hello World')

let genOneImg = document.querySelectorAll('.gen1--img') //gets img containers


async function getPkmn(){
    for(i=0; i<genOneImg.length; i++){
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`);
        let data = await response.json();
        console.log(data);
        genOneImg[i].style.backgroundImage = `url('${data.sprites.front_default}')`;
    }
}
getPkmn();