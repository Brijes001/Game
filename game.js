const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let  gameGrid;

const winnigPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
//let's create function to initialise the game
function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    // For UI on empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //initialise box with css properties again
        box.classList=`box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    //update UI
    gameInfo.innerText=`Current Player - ${currentPlayer}`; 
}

function cheakGameOver(){
    // To Do
    let answer="";
    winnigPositions.forEach((position)=>{
        // all 3 boxes should  be non empty and exectly same in value   
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]=== gameGrid[position[2]] )){
            // checkk if winner is X
            if(gameGrid[position[0]]==="X"){
                answer="X";
            } else{
                answer="O";
            }
            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            // now we konw X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
    })
        //It means we have winner
    if(answer!== ""){
    gameInfo.innerText  =`Winner player ${answer}`;
    newGameBtn.classList.add("active"); 
    return;  
 }
 //let's check weather there is tie
let fillCount=0;
gameGrid.forEach((box)=>{
    if (box !=="")
        fillCount++;
    
});
    if(fillCount===9){
        gameInfo.innerText="Game is Tie";
        newGameBtn.classList.add("active");
    }
}




function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko

        swapTurn();
        //cheak  koi jeet toh nahi gaya
        cheakGameOver(); 
    }
}

boxes.forEach((box, index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);

    })

})
newGameBtn.addEventListener("click",initGame);