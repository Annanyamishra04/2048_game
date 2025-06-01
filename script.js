const board = document.getElementById('board');
const newGameButton = document.getElementById('new-game');

let grid = [];
let score = 0;


function initializeGrid() {
  grid = [];
  for (let i = 0; i < 4; i++) {
    grid.push([0, 0, 0, 0]);
  }
  updateScore()
  addNewTile();
  addNewTile();
  renderBoard();
}

const scoreDisplay=document.getElementById('score');


function renderBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const value = grid[i][j];
        if (value !== 0) {
          const tile = document.createElement('div');
          tile.className = 'tile';
          tile.textContent = value;
          tile.style.transform = `translate(${j * 105}px, ${i * 105}px)`;
          tile.style.background = getTileColor(value);
          tile.style.color = value > 4 ? '#f9f6f2' : '#776e65';
          board.appendChild(tile);
        }
        
      }
    }
  }
  


  function getTileColor(value) {
    const colors = {
      2: "#d0bfff", 4: "#a66cff", 8: "#9370db",
      16: "#7b68ee", 32: "#6a5acd", 64: "#483d8b",
      128: "#4b0082", 256: "#8a2be2", 512: "#7b68ee",
      1024: "#6a0dad", 2048: "#5d3fd3"
    };
    return colors[value] || "#2c3e50";
  }
  
  

function addNewTile() {
  let emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        emptyTiles.push({ i, j });
      }
    }
  }
  
  if (emptyTiles.length === 0) return;

  const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;
}
function transpose(matrix){
    return matrix[0].map((_, i)=> matrix.map(row=> row[i]));
}
function reverseRows(matrix){
    return matrix.map(row=> row.reverse());
}

function swipeLeft() {
  let moved = false;

  for (let i = 0; i < 4; i++) {
    let row = grid[i].filter(val => val !== 0); 
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        score += row[j];
        row[j + 1] = 0;
        moved = true;
      }
    }
    
    row = row.filter(val => val !== 0);
    while (row.length < 4) row.push(0);

    
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] !== row[j]) {
        moved = true;
        grid[i][j] = row[j];
      }
    }
  }

  if (moved) {
    addNewTile();
    renderBoard();
    updateScore();
    checkGameOver();
  }
}

  
function swipeRight() {
  grid = grid.map(row => row.reverse());
  swipeLeft();
  grid = grid.map(row => row.reverse());
}

  
function swipeUp() {
  grid = transpose(grid);
  swipeLeft();
  grid = transpose(grid);
}

  
function swipeDown() {
  grid = transpose(grid);
  swipeRight();
  grid = transpose(grid);
}

  
function transpose(matrix) {
  return matrix[0].map((_, col) => matrix.map(row => row[col]));
}
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'arrowleft' || key === 'a') swipeLeft();
    else if (key === 'arrowright' || key === 'd') swipeRight();
    else if (key === 'arrowup' || key === 'w') swipeUp();
    else if (key === 'arrowdown' || key === 's') swipeDown();
  });
  
function checkGameOver(){
    const noMovesLeft=!canMove();
    if(noMovesLeft){
        setTimeout(()=>{
            alert("Game Over!");
            initializeGrid();
            score=0;
            updateScore();
        }, 200);
    }
}
function canMove(){
    for(let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(grid[i][j]===0) return true;
            if(j<3 && grid[i][j]=== grid[i][j+1]) return true;
            if(i<3 && grid[i][j]===grid[i+1][j]) return true;
        }
    }
    return false;
    updateScore(nextTile.value);
}  
  


newGameButton.addEventListener('click', () => {
  initializeGrid();
});

initializeGrid();
