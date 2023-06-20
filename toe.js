let boxes = document.querySelectorAll(".box");
let gameTnfo = document.querySelector(".game-info");
let newgameBtn = document.querySelector(".btn");

let currentplayer;
let gameGrid;
const winningPos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//func to intilaize the game 
function initGame(){
    currentplayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // green color hatana hai toh isme sari css prop ko defualt wali hi set kardo
        box.classList = `box box${index+1}`;
    });

    newgameBtn.classList.remove("active");
    gameTnfo.innerText = `Current Player - ${currentplayer}`;
}
initGame();

function checkGameOver(){
    let ans = "";
    winningPos.forEach((position) =>{
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]])
        && (gameGrid[position[1]] === gameGrid[position[2]])){

            if (gameGrid[position[0]] === "X")
                ans = "X";
            else
                ans = "0";

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            });
            
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(ans !== ""){
        gameTnfo.innerText = `Winner Player - ${ans}`;
        newgameBtn.classList.add("active");
    }
    // tie wala case 
    let fill ="";
    gameGrid.forEach((grid) =>{
        if (grid !== "")
            fill++;
    });

    if (fill === 9){
        gameTnfo.innerText = " Game Tied !";
        newgameBtn.classList.add("active");
    }
};



function swapTurn(){
    if (currentplayer === "X"){
        currentplayer = "0";
    }
    else{
        currentplayer = "X";
    }
    gameTnfo.innerText = `Current Player - ${currentplayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentplayer;
        gameGrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
};

boxes.forEach((box,index) =>{
    box.addEventListener("click" , () =>{
        handleClick(index);
    })
});

newgameBtn.addEventListener("click", initGame);
