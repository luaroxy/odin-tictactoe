const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    
    const updateGameboard = (x) => {
        gameboard[x]="x";
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

const Player = () => {

};

function game(e){
    console.log("deu certo");
    x=e.dataset.array;
    Gameboard.updateGameboard(x);
    Gameboard.displayGameboard();
    console.log(Gameboard.updateGameboard(x));
}