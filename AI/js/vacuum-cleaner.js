/*jslint browser: true*/
/*global $, jQuery, alert*/
var room4b4 = [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0];
var room5b6 = [];

function Vacuum(room) {
    this.inRoom = room;
    var score = 0;
}

/*function Node() {
    
}*/

$(document).ready(function () {
    //Check if key down
    $(document).keydown(function (key) {
        /*
        Code for moving divs with arrow keys
        //Check which key is pressed down
        var keyname;
        switch (key.which) {
        case 37:
            keyname = "left-arrow";
            $('div').stop(true).animate({left: "-=10px"}, "fast");
            break;
        case 38:
            keyname = "up-arrow";
            $('div').stop(true).animate({top: "-=10px"}, "fast");
            break;
        case 39:
            keyname = "right-arrow";
            $('div').stop(true).animate({left: "+=10px"}, "fast");
            break;
        case 40:
            keyname = "down-arrow";
            $('div').stop(true).animate({top: "+=10px"}, "fast");
            break;
        }
        $("#key").text(keyname);
        */
    });
});

$(document).ready(function () {
    $("button").click(function () {
        $("div").animate({left: '300px'}, "fast");
    });
});