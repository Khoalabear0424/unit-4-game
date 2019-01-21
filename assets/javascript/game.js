var characters = [
    {
        name: "Ray",
        src: "./assets/images/rey.png",
        health: 200,
        power: 12,
        counter: 20
    },
    {
        name: "Han Solo",
        src: "./assets/images/han.png",
        health: 250,
        power: 8,
        counter: 18
    },
    {
        name: "Darth Vader",
        src: "./assets/images/vader.png",
        health: 275,
        power: 10,
        counter: 15
    },
    {
        name: "Kylo Ren",
        src: "./assets/images/kylo.png",
        health: 230,
        power: 12,
        counter: 17
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
var attackMultiplier = 1;
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
        $('#victory').hide();
        $('#playAgain').hide();
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
    userHealth = parseInt($('#health1').text());
    defenderHealth = parseInt($('#health2').text());
    defenderCounter = characters[imgPosition2].counter;
});


//-------------Battle Logic---------------//
$('button').on('click', function () {
    if (buttonClick == true) {
        var userPower = characters[imgPosition1].power;
        userHealth -= defenderCounter;
        defenderHealth -= (userPower * attackMultiplier);

        $('#health1').text(userHealth);
        $('#health2').text(defenderHealth);
        $('#power1').text(userPower * attackMultiplier);



        if (userHealth <= 0) {
            console.log("lose!");
            var $h4 = $('<h4></h4>')
            $h4.text("You Lose!");
            $('#attacker > figure').html($h4);
            buttonClick = false;

            $('button').text("Play Again");
            $('button').removeClass('btn-danger');
            $('button').addClass('btn-warning');
            $('button').on('click', function () {
                location.reload();
            });


        } else if (defenderHealth <= 0) {
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
            } else if(winCount === 3) {
                $('#victory img').attr('src',characters[imgPosition1].src);

                $('button').on('click', function () {
                    location.reload();
                });
                $('#battle').fadeOut('slow',function(){
                    $('#victory').fadeIn('slow');

                    setTimeout(function(){
                        $('#playAgain').fadeIn('slow');

                    },1500);
                });
            }
        };

        attackMultiplier++;
    }
});

//win: kylo -> vader/ray/han
