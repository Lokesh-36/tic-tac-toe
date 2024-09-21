const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

// All possible combinations for winning
const winningPostions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer;
let gameGrid;

//create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI par empty karne ke liye
    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGamebtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver() {
    let result = "";
    winningPostions.forEach((position) => {
      if (
        (gameGrid[position[0]] !== "" ||
          gameGrid[position[1]] !== "" ||
          gameGrid[position[2]] !== "") &&
        gameGrid[position[0]] === gameGrid[position[1]] &&
        gameGrid[position[0]] === gameGrid[position[2]]
      ) {
        boxes.forEach((box) => {
          box.style.pointerEvents = "none";
        });
        if (gameGrid[position[0]] === "X") result = "X";
        else result = "0";
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
      }
    });
    //  We Have A Winner
    if (result !== "") {
      gameInfo.innerText = `Winner Player - ${result}`;
      newGamebtn.classList.add("active");
      return;
    }

    //we know no winner is found
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
            fillCount++
    });

    //board is filled , game is tie
    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGamebtn.classList.add("active");
    }
  }

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    //UI update 
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check karo koi jeet to nahi gaya
        checkGameOver();
    }
}

boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click" , initGame);