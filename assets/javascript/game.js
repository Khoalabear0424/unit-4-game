var characters = [
    {
        name: "Rey",
        src: "./assets/images/rey.png",
        health: 10,
        attack: 10,
        counter: 10,
    },
    {
        name: "Han Solo",
        src: "./assets/images/han.png",
        health: 10,
        attack: 10,
        counter: 10,
    },
    {
        name: "Darth Vader",
        src: "./assets/images/vader.png",
        health: 10,
        attack: 10,
        counter: 10,
    },
    {
        name: "Kylo Ren",
        src: "./assets/images/kylo.png",
        health: 10,
        attack: 10,
        counter: 10,
    }
];

//---------Load photos of characters to Staging----------//

for(var i=0; i<characters.length; i++){
var $im = $('<img>');
$im.attr('src',characters[i].src);

$('.stage').eq(i).html($im);
};