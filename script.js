const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];

    function resetGameboard() {
        gameboard = ["", "", "", "", "", "", "", "", ""];
    }
    
    const updateGameboard = (x,symbol) => {
        gameboard[x]=symbol;
    };

    const displayGameboard = () => {
        const cellDivs = document.getElementsByClassName('cell');
        for(let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].innerText = gameboard[i];
          };
    };

    const checkWinner = () => {
        let gameOver=false;
        let caseWin1 = _CaseWin([gameboard[0], gameboard[1], gameboard[2]], 0, 1, 2);
        let caseWin2 = _CaseWin([gameboard[3], gameboard[4], gameboard[5]], 3, 4, 5);
        let caseWin3 = _CaseWin([gameboard[6], gameboard[7], gameboard[8]], 6, 7, 8);
        let caseWin4 = _CaseWin([gameboard[0], gameboard[3], gameboard[6]], 0, 3, 6);
        let caseWin5 = _CaseWin([gameboard[1], gameboard[4], gameboard[7]], 1, 4, 7);
        let caseWin6 = _CaseWin([gameboard[2], gameboard[5], gameboard[8]], 2, 5, 8);
        let caseWin7 = _CaseWin([gameboard[0], gameboard[4], gameboard[8]], 0, 4, 8);
        let caseWin8 = _CaseWin([gameboard[2], gameboard[4], gameboard[6]], 2, 4, 6);
        let cases = [caseWin1, caseWin2, caseWin3, caseWin4, caseWin5, caseWin6, caseWin7, caseWin8];

        displayResult = document.getElementById("displayResult");

        cases.forEach(element => {
            if (_allEqual(element.caseArray) && element.caseArray[0]!="") {
                gameOver = true;
                if (element.caseArray[0]=="X"){
               // console.log(`Player ${element.caseArray[0]} Wins!`);
               displayResult.textContent =`${player1.name} Wins!`;
                } else displayResult.textContent =`${player2.name} Wins!`;
                displayResult.style.display = "block";
                // Add color background to the winner cells
                cellWinners = document.querySelectorAll(`[data-array="${element.data1}"], [data-array="${element.data2}"], [data-array="${element.data3}"]`);
                cellWinners.forEach(e => e.style.backgroundColor = "palegreen");
            }
        });

        if (!gameboard.includes("")&& gameOver==false){
            displayResult.textContent ="It's a tie!";
            displayResult.style.display = "block";
            gameOver=true;
        }
    }

    const _CaseWin = (caseArray, data1, data2, data3) => {
        return {caseArray, data1, data2, data3};
    };

    const _allEqual = arr => arr.every(val => val === arr[0]);


    return {updateGameboard, displayGameboard, checkWinner, resetGameboard};
})();

const Player = (name, symbol) => {
    return {name, symbol};
};

function game(e){
    x=e.dataset.array;
    if (e.innerText == ""){
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
    } else {
        alert("This spot is already taken!");
}
}

let player1Turn = true;

function openForm() {
    document.getElementById("newGamepopup").style.display = "block";
    restartGame();
}

function closeForm() {
   document.getElementById("newGamepopup").style.display  = "none";
}

const form = document.getElementById("newGameForm");
form.addEventListener("submit", function (e) {
	e.preventDefault();
   let form = document.getElementById("newGameForm");
   let player1Name = form.elements["playerX"];
   let player2Name = form.elements["playerO"];
   player1 = Player(player1Name.value, "X");
   player2 = Player (player2Name.value, "O");
   closeForm();
});

function restartGame(){
    Gameboard.resetGameboard();
    Gameboard.displayGameboard();
    document.getElementById("displayResult").style.display  = "none";
    cells = document.querySelectorAll(".cell");
    cells.forEach(e => e.style.backgroundColor = "rgba(255, 255, 255, 0.637)");
}