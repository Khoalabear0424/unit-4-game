var characters = [
    {
        name: "Rey",
        src: "./assets/images/rey.png",
        health: 10,
        attack: 10,
        counter: 10
    },
    {
        name: "Han Solo",
        src: "./assets/images/han.png",
        health: 10,
        attack: 10,
        counter: 10
    },
    {
        name: "Darth Vader",
        src: "./assets/images/vader.png",
        health: 10,
        attack: 10,
        counter: 10
    },
    {
        name: "Kylo Ren",
        src: "./assets/images/kylo.png",
        health: 10,
        attack: 10,
        counter: 10
    }
];

//---------Load photos of characters to Staging----------//
for(var i=0; i<characters.length; i++){
var $fig = $('<figure></figure>')
var $im = $('<img>');
var $cap = $('<figcaption></figcaption>')

$im.attr('src',characters[i].src);
$im.attr('value',i);
$im.addClass('figure-img img-fluid rounded');
$cap.text(characters[i].name);
$fig.addClass('figure-caption text-center');

$fig.append($im);
$fig.append($cap);
$('.stage').eq(i).html($fig);
};

//---------Hide Battle Stage onLoad()----------//
$('document').ready(function() {
    window.onload = function(){
        $('#battle').hide();
    }
});

//------------Transition to Battle------------//
$('img').on('click',function(){
    var imgPosition = $(this).attr('value');

    $('#staging').fadeOut('slow',function(){
    $('#battle').fadeIn(1000);
    });

    //--------------Populate Battle Field----------//
    var attack = $('#attacker');
    var defender = $('#defender');
    var allFigure = $('figure');
    var userChar = $('figure').eq(imgPosition);

    attack.append(userChar);

    for(var i=0; i<allFigure.length; i++){
        if(i != imgPosition){
        defender.append(allFigure.eq(i));
        };
    };
});



