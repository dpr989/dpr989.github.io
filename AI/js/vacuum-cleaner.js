/*jslint white: true, plusplus: true, sloppy: true*/

/*global $, jQuery, alert, console*/

/*NOTES:
    - To access html elements from jquery $(selector).action()
    - When a function is run use this to access context $(this) for
      jquery access to context

*/
function assert(assertion){
    if(assertion){
        return true;
    }
    return false;
}

//Object for holding 2D coord vals
function Coord2D (x,y) {
    this.x = x;
    this.y = y;
}

var ROOMCONFIG = function (){
    this.height = 0;
    this.width = 0;
    this.startRoom = 0;
    this.numberOfRooms = 0;
};

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

var room4b4 = {
                    name : "4x4",
                    clean : [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],  //1=clean, 0=dirty
                    visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1=visisted, 0=has not visited 
                    width : 4,
                    height : 4,
                    number : function(){return this.clean.length;},
                    start2D : new Coord2D(3,2),
                    start1D : function(){return convert2DTo1D(this.start2D);}
              }; 

var room5b6 = {
                    name : "5x6",
                    clean : [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
                    visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    width : 5,
                    height : 6,
                    number : function(){return this.clean.length;},
                    start2D : new Coord2D(3,2),
                    start1D : function(){return convert2DTo1D(this.start2D);}
             };

var options = []; //Array for storing user options gathered from DOM
var searchType; 



//Input: direction - string rep. of attempted direction to move 

function getRoom(direction, roomNum){
    var newRoom;
    switch(direction){
        case "UP":
            newRoom = (roomNum - ROOMCONFIG.width);
            break; 
        case "DOWN":
            newRoom = (roomNum + ROOMCONFIG.width);
            break;
        case "LEFT":
            newRoom = (roomNum - 1);
            break;
        case "RIGHT":
            newRoom = (roomNum + 1);
            break;
    }
    console.log(ROOMCONFIG.numberOfRooms+" "+newRoom);
    if(newRoom >= 0 && newRoom < ROOMCONFIG.numberOfRooms){return newRoom;} 
    return -1;
}

function buildGraph(numRooms, height, width){
    
}

//Object representing a room (node)
function Room (clean, visited, coord1D){
    
}

function roomVisited(rooms, room){
    if(rooms.visited[room] === 0){ //Check if NOT visited
        //Room not visited
        return false;
    }
    //Room visited
    return true;
}

function setVisited(rooms, room){
    rooms.visited[room] = 1;
}

function getNeighbors(room){
    //Check if UP, DOWN, LEFT, RIGHT valid if so add to stack
    var nstack, i,D = ["UP","DOWN","RIGHT","LEFT"];
    for(i=0; i<4; i++){
        
    }
    
    
}

function dfs(rooms, vacuum) {
    /* DFS(G,v)   ( v is the vertex where the search starts )
         xStack S := {};   ( start with an empty stack )
         xfor each vertex u, set visited[u] := false;
         xpush S, v;
         xwhile (S is not empty) do
            xu := pop S;
            xif (not visited[u]) then
               xvisited[u] := true;
               for each unvisited neighbour w of u
                  push S, w;
            end if
         end while
      END DFS()*/
    var stack = [], neighbors = [], roomNum, room;
    
    //Itterate through each room setting it to not-visited (0)
    for(roomNum=0; roomNum < rooms.number; roomNum++){
        rooms.visited[roomNum] = 0;
    }
    
    //Push starting room onto stack
    stack.push(rooms.start1D);
    
    //Itterate until "stack" is empty
    while(stack.length !== 0){ //NOTE: ===, !==, <==, >== are type safe comparitors (checks type and value )
        room = stack.pop();
        //Check if the room has been visited
        if(roomVisited(rooms, room) === false){
            //The room has NOT been visited...
            setVisited(rooms, room); //Set to visited
            neighbors = getNeighbors(rooms, room);
            
        }
    }
    

    
}

function ids() {
    
}

function aStar(nRooms) {
    
}

//room - is 1D location of Vaccum
function Vacuum(room) {
    this.inRoom = room;
    this.coords = convert1DTo2D(room);
    var score = 0;
    //this.Move = function (direction) {
    //};
}

//Main function
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
        
        //Setup current room config
        ROOMCONFIG.width = rmConfig.width;
        ROOMCONFIG.height = rmConfig.height;
        
        /*TEST:console.log(rmConfig.name + " was choosen");*/
        /*TEST: console.log(ROOMCONFIG.width);*/
        /*TEST: console.log(ROOMCONFIG.height);*/
        //TEST: vallidMove(direction, room)
        //TEST: 4x4 moves
        console.log("UP from 0 is room#:"+getRoom("UP", 0));
        console.log("UP from 3 is room#:"+getRoom("UP", 3));
        console.log("UP from 12 is room#:"+getRoom("UP", 12));
        console.log("UP from 15 is room#:"+getRoom("UP", 15));
        
        
        //Place robot in room
        vacuum = new Vacuum(rmConfig.start1D);
        //test(s)
        getNeighbors(1);
        //Switch statement choosing which alg to run
        /*switch (options[searchType]) {
            case "DFS":
                dfs(rmConfig, vacuum);
                break;
            case "IDS":
                ids(rmConfig, vacuum);
                break;
            case "A":
                aStar(rmConfig, vacuum);
                break;
        }*/
    });
});

/****BELOW HERE LIES FUN****/
/*$(document).ready(function () {
    //Check if key down
    $(document).keydown(function (key) {
       
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
        
    });
});

$(document).ready(function () {
    $("button").click(function () {
        $("div").animate({left: '300px'}, "fast");
    });
});*/