//$ jquery symbol ready method of the DOM waits for everything to lead before running this function
//document is a global variable can be replaced with any element such as class or ID
//can pass an HTML node element such as div r reference to HTML element such as the class name
//such as $('.bird').ready(function(){}) 
$(document).ready(function () {
    var count = 0;
    var time = 0;
    var result = null;

    var timer;

    var jokes = [
        "You're so slow, the bird grew a beard while racing... go look..., GOTCHA!!! didn't I?",
        "You're so slow, we had to measure your 10 second race with a calendar",
        "You're so slow, you came in 2nd in a 1 man race",
        "You're so slow, you have to chase the zombies",
        "You're slower than a slow cooker",
        "You're slower than a 1 legged dog on tranquilizers",
        "You're slower than Daenerys Targaryen on her way to Westeros",
        "You gotta get those fingers to the gym asap my nigga! You too slow!",
        "You've got some supreme slownest in those fingers son! You gotta do some finger cardio!",
        "You've got limitted edition slow fingers! go claim your Ginnes record!",
    ]

    function initialize() {
        timer = setInterval(game, 100);
    }

    function game() {
        //keep showing ready until counter hits 2000 otherwise it will disappear before user will have a chance to read it
        if (count >= 1000 && count < 2000) {
            $('.rsg').html('READY');
        } else if(count >= 2000 && count < 3000) {
            $('.rsg').html('SET');
        } else if(count >= 3000 && count < 4000) {
            $('.rsg').html('GO');
        } else{
            $('.rsg').html('');
        }

        //13000 milliseconds == 13 seconds
        if(time >= 13000 && !result) {
            result = 'lost';
            console.log('lost joke');
            stop();

            //math random will produce a number from 0 and .9999 never 1.
            showResult(jokes[Math.floor(Math.random() * jokes.length)], 'joke');
        }

        if(count >= 3000) {
            time += 100;
            $('.timer').html(time / 1000);
        }

        count += 100;
    }

    function stop() {
        clearInterval(timer);
    }

    function reset() {
        count = 0;
        time = 0;
        result = null;

        console.log('reseting');

        $('.result').addClass('hide').html('');
        $('.bird').css({
            'top': '46vh',
            'left': '4vw'
        });
        $('.timer').html(0);

        initialize();
    }

    $(window).keydown(function (e) {
        //offset is a jquery method to determine the top left
        let position = $('.bird').offset();
        let target = $('.line').offset();

        if(count > 3000) {
            //20 is the width of the bird
            if (position.left + 20 > target.left) {
                //!result means the game has not ended
                if(time >= 10000 && !result) {
                    result = 'lost';
                    stop();
                    showResult('YOU LOSE!');
                }
                if(time < 10000 && !result) {
                    result = 'won';
                    stop();
                    showResult('YOU WIN!');
                }
            }

            //left arrow
            if(e.keyCode === 37){
                if(position.left > 0){
                    //math.max lets you determine which value is greater....subtract 50 from the bird's current position
                    //don't let the bird's position be less than left 0
                    $('.bird').css('left', Math.max(position.left - 50, 0));
                }
            }

            //up arrow
            //don't let the bird's position be less than top 0
            if(e.keyCode === 38){
                if(position.top > 0){
                    $('.bird').css('top', Math.max(position.top - 50, 0));
                }
            }

            //right arrow
            //don't let the bird's right position be greater than window.innerWidth + bird width
            //this way of doing it may be clearer than the way it was written for the others
            if(e.keyCode === 39){
                if(position.left + $('.bird').width() < window.innerWidth){
                $('.bird').css('left', Math.min(position.left + 50,
                window.innerWidth - $('.bird').width()));
                }
            }

            //down arrow
            //don't let the bird's bottom position be greater than window.innerHeight + bird height
            if(e.keyCode === 40){
                if(position.top < window.innerWidth - $('.bird').height()){
                $('.bird').css('top', Math.min(position.top + 50,
                window.innerHeight - $('.bird').height()));
                }
            }
        }
    })

    $(window).keyup(function (e){
        let position = $('.bird').offset();
    });

    function showResult(msg, className){
        $('.result').removeClass('hide').html(`
        <div class=${className || ''}>${msg}</div>
        <div class="reset-btn">RESTART</div>`).promise().done(function (){
            $('.reset-btn').click(reset);
        });
    }

    initialize();
});