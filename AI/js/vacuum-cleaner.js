/*jslint white: true, plusplus: true, sloppy: true*/

/*global $, jQuery, alert, console*/

/*NOTES:
    - To access html elements from jquery $(selector).action()
    - When a function is run use this to access context $(this) for
      jquery access to context

*/


//Object for holding 2D coord vals
function Coord2D (x,y) {
    this.x = x;
    this.y = y;
}

var room4b4 = {
                    name : "4x4",
                    clean : [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],  //1=clean, 0=dirty
                    visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1=visisted, 0=has not visited 
                    width : 4,
                    height : 4,
                    numRooms : function(){return this.clean.length;},
                    start : new Coord2D(3,2)
              }; 

var room5b6 = {
                    name : "5x6",
                    clean : [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
                    visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    width : 5,
                    height : 6,
                    numRooms : function(){return this.clean.length;},
                    start : new Coord2D(3,2)
              };

var options = []; //Array for storing user options gathered from DOM
var searchType; 




function validMove(direction, roomConfig){
    
}



var ROOMCONFIG = function(){
    this.height = 0;
    this.width = 0;
    this.startRoom = 0;
    this.numberOfRooms = this.height * this.width;
};



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

function dfs(graph, vacuum) {
    /* DFS(G,v)   ( v is the vertex where the search starts )
         Stack S := {};   ( start with an empty stack )
         for each vertex u, set visited[u] := false;
         push S, v;
         while (S is not empty) do
            u := pop S;
            if (not visited[u]) then
               visited[u] := true;
               for each unvisited neighbour w of u
                  push S, w;
            end if
         end while
      END DFS()*/
    var stack = [], i;
    
    //Itterate through each vertex

    
}

function ids() {
    
}

function aStar(nRooms) {
    
}

function Vacuum(room) {
    this.inRoom = room;
    this.coords = convert1DTo2D(room);
    var score = 0;
    //this.Move = function (direction) {
    //};
}

$(document).ready(function () {
    $("#runSim").click(function () {
        //Data section
        var i, vacuum, rmConfig;
        
        //Itterate through (if any) the selected elements
        options = [];
        $("input:checked").each(function (index) {
            //Add options (input:checked -> value) selected by user to options[]
            options.push($(this).attr("value"));
           /* TEST: console.log(options[index]);*/  
        });
        //Set room properties
        if(options[0] === "4x4"){
            rmConfig = room4b4;
        }else{
            rmConfig = room5b6;
        }
        /*TEST:console.log(rmConfig.name + " was choosen");*/
        /*TEST: console.log(ROOMCONFIG.width);*/
        /*TEST: console.log(ROOMCONFIG.height);*/
        
        //Place robot in room
        vacuum = new Vacuum();
        //Switch statement choosing which alg to run
        switch (options[searchType]) {
            case "DFS":
                dfs(rmConfig, vacuum);
                break;
            case "IDS":
                ids(rmConfig, vacuum);
                break;
            case "A":
                aStar(rmConfig, vacuum);
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