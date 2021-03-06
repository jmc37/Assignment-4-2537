to_add = ''
// Get pokemon info
function get_random_pokemon(data) {
    console.log(data.sprites.other["official-artwork"].front_default)
    
    to_add += `  <div class="img-container"> ${data.name} <br>
    <a href="/profile/${data.id}">
    <img src="${data.sprites.other["official-artwork"].front_default}"> 
    </a>
    <br>
    Type: ${data.types[0].type.name}
    <button class="add-cart" id="${data.name}">Add to Cart</button>
    </div>`

}

// Display images
async function loadImages() {
    for (i = 1; i <= 9; i++) { // Nine times
        if (i % 3 == 1) { // only when i= 1, 4, 7
            to_add += `<div class="clearfix">`
        }

        pokemon_number = Math.floor(Math.random() * 898) + 1;
        await $.ajax({
            "url": `https://pokeapi.co/api/v2/pokemon/${pokemon_number}/`,
            "type": "GET",
            "success": get_random_pokemon
        })


        if (i % 3 == 0) { // only when i= 3, 6, 9
            to_add += `</div>`
        }
    }
    $("main").html(to_add)
}

function getAllPokemons(){
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`,
        "type": "GET",
        "success": generateAllPokemons
    })
}

function getRandomPokemons(randomPokeName){
    $.ajax({
        "url": `https://pokeapi.co/api/v2/pokemon/${randomPokeName}`,
        "type": "GET",
        "success": displayRandomPokemons
    })
}


function addCartItem(){
    x = this.id 
    $.ajax({
        url: `https://bcit-pokedex.herokuapp.com/cart/add/${x}`,
        type: "get",
        success: alert(`Added ${x} to cart`)
    })
}


function setup() {
    loadImages();
    $(document).on("click", ".add-cart", addCartItem)
    
}

jQuery(document).ready(setup)