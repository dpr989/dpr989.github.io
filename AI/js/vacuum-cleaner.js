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
    
    this.toString = function (){
        return "("+(this.x+1)+","+(this.y+1)+")";
    };
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
    var x = 0, y = coord1D % ROOMCONFIG.width;

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
    return (ROOMCONFIG.width*((coord2D.x))) + coord2D.y;
}

function Vacuum(room) {
    this.inRoom = room;
    this.coords = convert1DTo2D(room);
    var score = 0;
}


var room4b4 = {
                name : "4x4",
                clean : [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],  //1=clean, 0=dirty
                visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1=visisted, 0=has not visited 
                closed : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                dirty : function(){return this.clean.filter(function(el){return el === 1;}).length;},
                width : 4,
                height : 4,
                number : function(){return this.clean.length;},
                start2D : new Coord2D(2,1),
                start1D : function(){return convert2DTo1D(this.start2D);}
              }; 

var room5b6 = {
                name : "5x6",
                clean : [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
                visited : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                closed : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                dirty : function(){return this.clean.filter(function(el){return el === 1;}).length;},
                width : 5,
                height : 6,
                start2D : new Coord2D(2,1),
                start1D : function(){return convert2DTo1D(this.start2D);}
             };

var options = []; //Array for storing user options gathered from DOM
var searchType = 1; 

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
            if(roomNum % 4 === 0){
                newRoom = -1;
            }
            else{                       
                newRoom = (roomNum - 1);
            }
            break;
        case "RIGHT":
            if((roomNum + 1) % 4 === 0){
                newRoom = -1;
            }
            else{                       
                newRoom = (roomNum + 1);
            }
            break;
    }
    if(newRoom >= 0 && newRoom < ROOMCONFIG.numberOfRooms){
        return newRoom;
    } 
    return -1;
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

function checkForDirt(rooms, room){
    //Clean if you can
    if(rooms.clean[room] === 1) {
        rooms.clean[room] = 0;
        rooms.dirty--;
        //TEST
        console.log("Room#: "+room+" "+convert1DTo2D(room).toString()+" has been cleaned!!!");
    }
}

function getNeighbors(rooms, room){
    if(room > 15 || room < 0){return -1;}
    //Check if UP, DOWN, LEFT, RIGHT valid if so add to stack
    var nstack = [], i, r, D = ["UP","DOWN","RIGHT","LEFT"];
    //TEST
    //console.log("Poss. moves from room#: "+room);
    for(i=0; i<D.length; i++){
        r = getRoom(D[i],room);
        //TEST
        //sconsole.log("Neighbor #:"+i +" neighbors");
        if(r>=0 && rooms.visited[r] === 0){ //Check if room is valid & visited=0
            //TEST
            //console.log("Room#: "+r+" is a possible move...");
            nstack.push(r); 
        }
    }
    return nstack;
}

function largeToSmall(a, b){
    return parseInt(a,10) < parseInt(b,10);
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
    var stack = [], neighbors = [], visitHist = [], roomNum, room,count = 0;
    //TEST
    //console.log("In DFS:");
    //Itterate through each room setting it to not-visited (0)
    for(roomNum=0; roomNum < rooms.visited.length; roomNum++){rooms.visited[roomNum] = 0;}
    
    //Push starting room onto stack
    stack.push(rooms.start1D());
    //TEST:
    //console.log("Start in room#: "+rooms.start1D()+" "+rooms.start2D);

    while(stack.length !== 0){
        //Check if backtracking is neccessary
        room = stack.pop();
        //TEST
        console.log("Expanded "+convert1DTo2D(room).toString());
        
        //TEST
        //console.log(room + "-> ");
        //Check if the room has been visited
        if(rooms.closed[room] === 0){
            visitHist.push(room);
           
            setVisited(rooms, room);
            //Check for dirt, updates room
            checkForDirt(rooms, room);
            
            //Returns an array of room's neighbors
            neighbors=[];
            neighbors = getNeighbors(rooms, room).sort(largeToSmall);
            //TEST
            //console.log("Room#:"+room+" has the following unvisited neighbors:"+neighbors);
            
            //TEST
            //console.log("Neighbors of room "+room+": "+neighbors);
            
            //Add the new elements to the array
            stack = stack.concat(neighbors);
            //TEST
            //console.log("Stack = "+ stack);
            //Reached a dead end, need to backtrack, do so by pushing hist on stack
            if(neighbors.length === 0){
                stack.push(visitHist.pop());
                rooms.closed[room] = 1;
                console.log("Room#: "+room+" "+convert1DTo2D(room).toString()+" has been visited");
            }
        }
    }
    console.log("END");
}

function ids() {
    
}

function aStar(nRooms) {
    
}

//room - is 1D location of Vaccum

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
        ROOMCONFIG.numberOfRooms = rmConfig.number();
        
        /*TEST:console.log(rmConfig.name + " was choosen");*/
        /*TEST: console.log(ROOMCONFIG.width);*/
        /*TEST: console.log(ROOMCONFIG.height);*/
        //TEST: vallidMove(direction, room)
        
        //TEST: 4x4 moves
        //getRoom(direction, roomnum)
        /*console.log("UP from 0 is room#:"+getRoom("UP", 0));
        console.log("UP from 3 is room#:"+getRoom("UP", 3));
        console.log("UP from 12 is room#:"+getRoom("UP", 12));
        console.log("UP from 15 is room#:"+getRoom("UP", 15));*/
        
        //getNeighbors(rooms, room)
        /*console.log("Neighbors of r#: "+0+" "+getNeighbors(rmConfig, 0));
        console.log("Neighbors of r#: "+5+" "+getNeighbors(rmConfig, 5));
        console.log("Neighbors of r#: "+0+" "+getNeighbors(rmConfig, 15));
        console.log("Neighbors of r#: "+0+" "+getNeighbors(rmConfig, 13));*/
        
        //console.log(getNeighbors(room4b4, 12));
        //Place robot in room
        vacuum = new Vacuum(rmConfig.start1D);
        console.log(rmConfig.dirty());
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