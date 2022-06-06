const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const updateGameboard = (x,symbol) => {
        gameboard[x]=symbol;
        return gameboard;
    }

    const displayGameboard = () => {
        const cellDivs = document.getElementsByClassName('cell');
        for(let i = 0; i < cellDivs.length; i++) {
            cellDivs[i].innerText = gameboard[i];
          };
    };

    return {updateGameboard, displayGameboard};
})();

const Player = (symbol) => {
    return {symbol};
};

player1 = Player("X");
player2 = Player ("O");
let = player1Turn = true;

function game(e){
    x=e.dataset.array;
    test=e.innerText;
    console.log(test);
    if (e.innerText == ""){
        if (player1Turn) {
            symbol = player1.symbol;
            player1Turn = false;
        } else {
            symbol = player2.symbol;
            player1Turn = true;
        }
        console.log(symbol);
        Gameboard.updateGameboard(x,symbol);
        Gameboard.displayGameboard();
    } else {
        alert("This spot is already taken!");
}
}