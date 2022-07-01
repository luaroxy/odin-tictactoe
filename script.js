const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    function resetGameboard() {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }
    
    function computerMove(){
        //generate a random position in gameboard and only consider it if it's empty ("")
        do {
            random = Math.floor(Math.random() * gameboard.length);
        }
        while (gameboard[random]!= "");
        return random;
    }

    const updateGameboard = (x,symbol) => {
        //add symbol to the gameboard position selected by player
        gameboard[x]=symbol;
    };

    const displayGameboard = () => {
        //render the contents of the gameboard array to the webpage 
        const cellDivs = document.getElementsByClassName('cell');
        for(let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].innerText = gameboard[i];
          };
    };

    const checkWinner = () => {
        let gameOver=false;
        //cases where the player can win if all elements are equal + the cells position
        let caseWin1 = _CaseWin([gameboard[0], gameboard[1], gameboard[2]], 0, 1, 2);
        let caseWin2 = _CaseWin([gameboard[3], gameboard[4], gameboard[5]], 3, 4, 5);
        let caseWin3 = _CaseWin([gameboard[6], gameboard[7], gameboard[8]], 6, 7, 8);
        let caseWin4 = _CaseWin([gameboard[0], gameboard[3], gameboard[6]], 0, 3, 6);
        let caseWin5 = _CaseWin([gameboard[1], gameboard[4], gameboard[7]], 1, 4, 7);
        let caseWin6 = _CaseWin([gameboard[2], gameboard[5], gameboard[8]], 2, 5, 8);
        let caseWin7 = _CaseWin([gameboard[0], gameboard[4], gameboard[8]], 0, 4, 8);
        let caseWin8 = _CaseWin([gameboard[2], gameboard[4], gameboard[6]], 2, 4, 6);
        let cases = [caseWin1, caseWin2, caseWin3, caseWin4, caseWin5, caseWin6, caseWin7, caseWin8];

        //get the div where the result will be displayed
        displayResult = document.getElementById("displayResult");

        //check gameboard array to see if any player meets any case to win
        cases.forEach(element => {
            //_allEqual function check if all elements of array are equal, then the if check if they are not empty ("")
            if (_allEqual(element.caseArray) && element.caseArray[0]!="") {
                gameOver = true; //if all elements are non-empty and equal, then is game over
                //check if player 1 or 2 won based on their symbol (X or O)
                if (element.caseArray[0]=="X"){
                    displayResult.textContent =`${player1.name} Wins!`;
                } else displayResult.textContent =`${player2.name} Wins!`;
                displayResult.style.display = "block"; //make display result visible
                // Add color background to the winner cells
                cellWinners = document.querySelectorAll(`[data-array="${element.data1}"], [data-array="${element.data2}"], [data-array="${element.data3}"]`);
                cellWinners.forEach(e => e.style.backgroundColor = "palegreen");
            }
        });

        //Check if the game is over and it's a tie, if there is no empty("") in gameboard array and gameover is false
        if (!gameboard.includes("")&& gameOver==false){
            displayResult.textContent ="It's a tie!";
            displayResult.style.display = "block"; //make display result visible
            gameOver=true;
        }

        return gameOver;
    }

    //create object of the cases to win the game
    const _CaseWin = (caseArray, data1, data2, data3) => {
        return {caseArray, data1, data2, data3};
    };

    //check if all elements of array are equal
    const _allEqual = arr => arr.every(val => val === arr[0]);


    return {updateGameboard, displayGameboard, checkWinner, resetGameboard, computerMove};
})();

//create object player
const Player = (name, symbol) => {
    return {name, symbol};
};


function game(e){
    if (!Gameboard.checkWinner()){ //just run the code if the game is not over
        x=e.dataset.array; //get the database of the array to identify the gameboard index
        if (e.innerText == ""){ //just run the code if the cell is empty, if the spot wasn't already taken
            if (computer){ //if playing against computer
                Gameboard.updateGameboard(x,player1.symbol);
                Gameboard.displayGameboard();
                if (!Gameboard.checkWinner()){ //only do computer move if game is not over
                    y=Gameboard.computerMove();
                    Gameboard.updateGameboard(y,player2.symbol);
                    setTimeout('Gameboard.displayGameboard();',400); //delay 0.4s (computer thinking)
                    Gameboard.checkWinner();
                }
            }else { //if playing again another player
                if (player1Turn) {
                    symbol = player1.symbol;
                    player1Turn = false;
                } else {
                    symbol = player2.symbol;
                    player1Turn = true;
                }
                Gameboard.updateGameboard(x,symbol);
                Gameboard.displayGameboard();
                Gameboard.checkWinner();
            }
        } else {
            alert("This spot is already taken!"); //alert if the spot was already taken
        }
    }
}

function openForm() {
    document.getElementById("newGamepopup").style.display = "block";
    document.getElementById("formContainer").style.display = "none";
    document.getElementById("player2Computer").style.display = "none";
    document.getElementById("player2Human").style.display = "none";
    document.getElementById("initialScreen").style.display = "block";
    restartGame();
}

function closeForm() {
   document.getElementById("newGamepopup").style.display  = "none";
}

function onePlayer(){
    document.getElementById("initialScreen").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("player2Computer").style.display = "block";
    computer = true;
}

function twoPlayers(){
    document.getElementById("initialScreen").style.display = "none";
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("player2Human").style.display = "block";
    computer = false;
}

function restartGame(){
    Gameboard.resetGameboard();
    Gameboard.displayGameboard();
    document.getElementById("displayResult").style.display  = "none";
    //clear green color from winning cells
    cells = document.querySelectorAll(".cell");
    cells.forEach(e => e.style.backgroundColor = "rgba(255, 255, 255, 0.637)");
}

//create players after form is submitted
const form = document.getElementById("newGameForm");
form.addEventListener("submit", function (e) {
   e.preventDefault(); //prevent the form to load all the page again
   let form = document.getElementById("newGameForm");
   let player1Name = form.elements["playerX"]; //get player1 name entered by user
   let player2Name = form.elements["playerO"]; //get player2 name entered by user
   player1 = Player(player1Name.value, "X"); //create player1 object
   if (computer) player2 = Player ("Computer", "O"); //if playing against computer, player2 name is Computer
   else player2 = Player (player2Name.value, "O"); //if playing against another player, player2 name is entered by user
   player1Turn = true;
   closeForm();
   document.getElementById("gameContainer").style.display = "block"; //show game block
});