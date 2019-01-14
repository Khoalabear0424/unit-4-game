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
var $fig = $('<figure></figure>')
var $im = $('<img>');
var $cap = $('<figcaption></figcaption>')

$im.attr('src',characters[i].src);
$im.addClass('figure-img img-fluid rounded');
$cap.text(characters[i].name);
$fig.addClass('figure-caption text-center');

$fig.append($im);
$fig.append($cap);
$('.stage').eq(i).html($fig);
};


//------------Onclick To Staged Images------------//
$('.stage').on('click',function(){
    alert($(this).text());
})

