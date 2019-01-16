var characters = [
    {
        name: "Rey",
        src: "./assets/images/rey.png",
        health: 300,
        power: 15,
        counter: 30
    },
    {
        name: "Han Solo",
        src: "./assets/images/han.png",
        health: 400,
        power: 20,
        counter: 25
    },
    {
        name: "Darth Vader",
        src: "./assets/images/vader.png",
        health: 450,
        power: 25,
        counter: 20
    },
    {
        name: "Kylo Ren",
        src: "./assets/images/kylo.png",
        health: 300,
        power: 30,
        counter: 30
    }
];

var counter = 0;

//---------Load photos of characters to Staging----------//
for (var i = 0; i < characters.length; i++) {
    var $fig = $('<figure></figure>')
    var $im = $('<img>');
    var $cap = $('<figcaption></figcaption>')

    $im.attr('src', characters[i].src);
    $im.attr('value', i);
    $im.addClass('figure-img img-fluid rounded img_wrap img_description');
    $cap.text(characters[i].name);
    
    $fig.addClass('figure-caption text-center');
    $fig.append($im);
    $fig.append($cap);
    $('.stage').eq(i).html($fig);
};

//---------Hide Battle Stage onLoad()----------//
$('document').ready(function () {
    window.onload = function () {
        $('#battle').hide();
    }
});

//------------Transition to Battle------------//
$('img').on('click', function () {
    if (counter == 0) {
        imgPosition1 = $(this).attr('value');
        $('#instructions').text('Select the first Defender');
        $('figure').eq(imgPosition1).fadeOut();
        counter++;
        
    } else if (counter == 1){
        $('#staging').fadeOut('slow', function () {
            $('#battle').fadeIn(1000);
            $('#battle').css("padding-top","0px");
        });

        $("header").animate({
            "padding-top": "20px",
            "padding-bottom": "0px"
        },1000);

        //--------------Populate Battle Field----------//
        imgPosition2 = $(this).attr('value');
        var attack = $('#attacker');
        var defender = $('#defender');
        var queue = $('.queue');
        var allFigure = $('figure');
        var userChar = $('figure').eq(imgPosition1);
        var firstDefender = $('figure').eq(imgPosition2);
        var queuePos = 0;
        buttonClick = true;

        $('figure').eq(imgPosition1).fadeIn();
        attack.prepend(userChar);
        defender.prepend(firstDefender);
        $('#health1').text(characters[imgPosition1].health);
        $('#health2').text(characters[imgPosition2].health);
        $('#power1').text(characters[imgPosition1].power);
        $('#power2').text(characters[imgPosition2].power);
        $('#counter1').text(characters[imgPosition1].counter);
        $('#counter2').text(characters[imgPosition2].counter);
        
        for (var i = 0; i < allFigure.length; i++) {
            if (i != imgPosition1 && i!= imgPosition2) {
                queue.eq(queuePos).append(allFigure.eq(i));
                queuePos++;
            };
        };
        counter++

    }
    mul =1;
    userHealth = parseInt($('#health1').text());
    userPower = parseInt($('#power1').text());
    defenderHealth =  parseInt($('#health2').text());
    defenderPower=  parseInt($('#power2').text());
});


//-------------Battle Logic---------------//
$('button').on('click',function(){
    if(buttonClick == true){
    userHealth -= defenderPower;
    defenderHealth -= (userPower*mul);
    console.log(userPower);
    ;

    $('#health1').text(userHealth);
    $('#health2').text(defenderHealth);
    $('#power1').text(userPower*mul);

    if(defenderHealth <= 0){
        buttonClick = false;
        counter = 1;
        
    } else if (userHealth <= 0) {
    };
    console.log("attack!");
    mul++;
}
});

