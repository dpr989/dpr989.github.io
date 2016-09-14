/*jslint white: true, sloppy: true*/

/*global $, jQuery, alert, console*/
/*NOTES:
    - To access html elements from jquery $(selector).action()
    - When a function is run use this to access context $(this) for
      jquery access to context

*/
var room4b4 = [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0]; //array of rooms 1 = dirty, 0 = clean
var room5b6 = [];

function validMove(direction, roomConfig){
    
}

function Vacuum(room) {
    this.inRoom = room;
    var score = 0;
    this.Move = function (direction) {
        /*if(validMove()){
            switch () {
                    case: 1
                     break;
            }
        }*/
    };
}

/*function Node() {
    
}*/
var options = [];
var numRooms = 0;
var searchType = 1; 

var ROOMCONFIG = function(){
    this.height = 0;
    this.width = 0;
    this.startRoom = 0;
};

//Object for holding 2D coord vals
function Coord2D (x,y) {
    this.x = x;
    this.y = y;
}

function buildGraph(numRooms, height, width){
    
}

//Object representing a room (node)
function Room (clean, visited, coord1D){
    
}

//Purpose: To convert from 2D->1D coordinante system
//Input: Takes coordinate pair (space delimited ex "2 3" is (2 3)) 
//Output: Returns a 
function convert1DTo2D (coord1D) {
    var x = 0, y = coord1D;

    if(coord1D > 6){
        x = Math.floor(coord1D/ROOMCONFIG.width);
    }else{
        x = 1;
    }
    return new Coord2D(x,y);
}

//Purpose: To convert from 1D->2D coordinante system
//Input: Takes single number which represents pos in 1D
//Output: A string containing cooresponding coordinate pair (ex 2 3)
function convert2DTo1D (coord2D) {
    return (ROOMCONFIG.width*((coord2D.x)-1)) + coord2D.y;
}

function dfs(nRooms) {
    //
}

function ids(nRooms) {
    
}

function aStar(nRooms) {
    
}

$(document).ready(function () {
    $("#runSim").click(function () {
        //Itterate through (if any) the selected elements
        options = [];
        $("input:checked").each(function (index) {
            //Add options (input:checked -> value) selected by user to options[]
            options.push($(this).attr("value"));
            /*TEST:*/console.log(options[index]);  
        });
        //Build rooms graph
        //Place robot in room
        var vacuum = new Vacuum();
        //Switch statement choosing which alg to run
        switch (options[searchType]) {
            case "DFS":
                dfs(options[numRooms]);
                break;
            case "IDS":
                ids(options[numRooms]);
                break;
            case "A":
                aStar(options[numRooms]);
                break;
        }
    });
});













/****BELOW HERE LIES FUN****/
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