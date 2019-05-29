//Build grid
let grid =  [1,2,3,4,5,6,7,8,9]
let xs = []
let os = []
let status = "play on"
let gameOver = false

//set X or O flag
let currentPlayer = "X"

messaging("start")
//let currentPlayer = "X"
//decide where  user clicked
$('.col').click(function() {
    if (gameOver) {
        return
    }
    $this =$(this);
    const cellnum = $this.data("cellnum");
    console.log("player picked " + cellnum)
    //Check to see that square is available
    //this uses a index position of -1 to indicate
    //false
    if (grid.indexOf(cellnum) === -1) {
        messaging("taken");
    }
    else{
        console.log("cell available")
        $this.html(currentPlayer);
            grid = grid.filter(function (value, index, arr) {
            console.log("current grid "+ grid); 
            return value !== cellnum;             
        });
        console.log("grid");
        addPlays(cellnum);
        currentPlays = xs

        if (currentPlayer==="O") {
            currentPlays=os
        }

        if (ifwinner(currentPlays)) {           
            gameOver = true
            messaging("winner");
        }
        else{
            flipcurrent(); 
            messaging("flip")     
        } 
    }
});
$("#restart").on ("click",(function() {
    resetGame();
    messaging("reset");
 }));  

//check to see if  the space is taken
function cellAvailable(cellnum) {
    let available = false
    if (grid.indexOf(cellnum) > -1)
        available = true
} 

//tally the count for each player
function addPlays(cellnum) {
    if (currentPlayer==="X") {
        xs.push(cellnum);
    }
    else{
        os.push(cellnum);
    }
    console.log('xs have ' + xs)
    console.log('os have ' + os)        
}

//flip the player flag
function flipcurrent() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X";
    }
}
//reset button is pressed
function resetGame() {
    $('.col').empty();
    grid =  [1,2,3,4,5,6,7,8,9]
    xs = []
    os = []
    gameOver = false
    currentPlayer = "X"
    ;
    }
 

// message handler
function messaging(message) {
    switch (message) {
        case "reset":
            console.log("reset Clicked");
            $('#status').html("New game! X goes first!.");
            break;

        case "winner": 
            console.log ('winner is ' + currentPlayer);
            $('#status').html("Game is over " + currentPlayer + " wins!");             
            break;

        case "flip":
            $('#status').html("Its " + currentPlayer + "'s turn!");  
            break;

        case "taken":
            $('#status').html("That spot is taken.");
            break;

        case "start":
            $('#status').html("New game! X goes first!.");
            break;
        
    }
}




//detect winning play
function ifwinner(plays) {
    winners=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]
    let playset = new Set(plays);
    let win=false;
    for (let wincom of winners) {
        if (playset.has(wincom[0]) && 
            playset.has(wincom[1]) && 
            playset.has(wincom[2])) {
            win = true;
        }    
    }
    return win
};




