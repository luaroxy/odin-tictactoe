const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const updateGameboard = (x,symbol) => {
        gameboard[x]=symbol;
       // return gameboard;
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

        cases.forEach(element => {
            if (_allEqual(element.caseArray) && element.caseArray[0]!="") {
                gameOver = true;
                console.log(`Player ${element.caseArray[0]} Wins!`);

                // Add color background to the winner cells
                cellWinners = document.querySelectorAll(`[data-array="${element.data1}"], [data-array="${element.data2}"], [data-array="${element.data3}"]`);
                cellWinners.forEach(e => e.style.backgroundColor = "palegreen");
            }
        });

        if (!gameboard.includes("")&& gameOver==false){
            console.log("It's a tie!")
            gameOver=true;
        }
    }

    const _CaseWin = (caseArray, data1, data2, data3) => {
        return {caseArray, data1, data2, data3};
    };

    const _allEqual = arr => arr.every(val => val === arr[0]);


    return {updateGameboard, displayGameboard, checkWinner};
})();

const Player = (symbol) => {
    return {symbol};
};

player1 = Player("X");
player2 = Player ("O");
let = player1Turn = true;

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