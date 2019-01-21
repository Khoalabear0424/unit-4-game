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

var winCount = 0;
var counter = 0;
var queuePos = 0;
var attack = $('#attacker');
var defender = $('#defender');
var userState = true;
var imgPosition1 = 0;
var imgPosition2 = 0;
var queue = {};
var allFigure = {};
var userChar = {};
var firstDefender = {};
var attackMultiplier = 0;
var queueFigure = [];

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

allFigure = $('figure');

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
        $('figure').eq(imgPosition1).hide();
        $('#power1').text(characters[imgPosition1].power);
        $('#health1').text(characters[imgPosition1].health);
        counter++;

    } else if (counter == 1) {
        $('#staging').hide('slow', function () {
            $('#battle').fadeIn(1000);
            $('#battle').css("padding-top", "0px");
        });

        $("header").animate({
            "padding-top": "20px",
            "padding-bottom": "0px"
        }, 1000);

        $('h4').hide();
        allFigure.eq(imgPosition1).unbind();

        //--------------Populate Battle Field----------//
        imgPosition2 = $(this).attr('value');
        queue = $('.queue');
        userChar = allFigure.eq(imgPosition1);
        firstDefender = allFigure.eq(imgPosition2);
        queuePos = 0;
        buttonClick = true;

        allFigure.eq(imgPosition1).fadeIn();
        allFigure.addClass('disabled');
        attack.prepend(userChar);
        defender.prepend(firstDefender);
        $('#health2').text(characters[imgPosition2].health);
        $('#power2').text(characters[imgPosition2].power);
        $('#counter1').text(characters[imgPosition1].counter);
        $('#counter2').text(characters[imgPosition2].counter);
        queueFigure = [];

        for (var i = 0; i < allFigure.length; i++) {
            if (i != imgPosition1 && i != imgPosition2) {
                queue.eq(queuePos).append(allFigure.eq(i));
                queuePos++;
                queue.push(i);
            };
        };
        counter++
    }
    attackMultiplier = 1;
    userHealth = parseInt($('#health1').text());
    userPower = parseInt($('#power1').text());
    defenderHealth = parseInt($('#health2').text());
    defenderPower = parseInt($('#power2').text());
});


//-------------Battle Logic---------------//
$('button').on('click', function () {
    if (buttonClick == true) {
        userHealth -= defenderPower;
        defenderHealth -= (userPower * attackMultiplier);
        ;

        $('#health1').text(userHealth);
        $('#health2').text(defenderHealth);
        $('#power1').text(userPower * attackMultiplier);

        if (defenderHealth <= 0) {
            $('#health2').text(0);
            buttonClick = false;
            counter = 1;
            winCount++;

            for(var i =0; i<queue.length; i++){
                allFigure.eq(queue[i]).removeClass('disabled');
            }

            if (winCount < 3) {
                $('#defender > figure').fadeOut('slow', function () {
                    $('h4').fadeIn('slow');
                });
            } else {
                $('#defender > figure').fadeOut('slow', function () {
                    alert("YOU WIN");
                    counter = 3;
                    $('h4').remove();

                });
            }


        } else if (userHealth <= 0) {
            $h4.text('You Lose!')
            $('#attacker > figure').html($h4);
            buttonClick = false;

            $('button').text("Play Again");
            $('button').removeClass('btn-danger');
            $('button').addClass('btn-warning');
            $('button').on('click', function () {
                location.reload();
            });
        };

        attackMultiplier++;
    }
});
