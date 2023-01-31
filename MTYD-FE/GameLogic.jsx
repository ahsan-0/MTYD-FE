import { useCallback } from "react";

function gameLoop (gameRef, gameGrid, setGameGrid, edgeCondition) {
  return () => {
        const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];
          if (!gameRef.current) return;
          const newGameGrid = structuredClone(gameGrid);
        
          for (let i = 0; i < gameGrid.length; i++) {
            for (let j = 0; j < gameGrid[i].length ; j++) {
              let liveNeighbours = 0;
              coordOffset.forEach(([x, y]) => {
                if (edgeCondition === "edge") {
                   if ( i + x >= 0 
                   && i + x < gameGrid.length 
                   && j + y >= 0 
                   && j + y < gameGrid[i].length) {
                     liveNeighbours += gameGrid[i + x][j + y];
                   }
                } else if (edgeCondition === "wrap") {
                const xWrapAroundOffset = (i + x + gameGrid[i].length) % gameGrid[i].length;
                const yWrapAroundOffset = (j + y + gameGrid.length) % gameGrid.length;
                liveNeighbours += gameGrid[xWrapAroundOffset][yWrapAroundOffset];
                };
              });
              if (liveNeighbours < 2 || liveNeighbours > 3) {
                newGameGrid[i][j] = 0;
              } else if (gameGrid[i][j] === 0 && liveNeighbours === 3) {
                newGameGrid[i][j] = 1;
              }
            }
          };
          setGameGrid(newGameGrid);
};
}


/*function gameLoop (gameRef, gameGrid, setGameGrid, edgeCondition) {

const runGame = () => {
const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];
  if (!gameRef.current) return;
  const newGameGrid = structuredClone(gameGrid);

  for (let i = 0; i < gameGrid.length; i++) {
    for (let j = 0; j < gameGrid[i].length ; j++) {
      let liveNeighbours = 0;
      coordOffset.forEach(([x, y]) => {
        if (edgeCondition === "edge") {
           if ( i + x >= 0 
           && i + x < gameGrid.length 
           && j + y >= 0 
           && j + y < gameGrid[i].length) {
             liveNeighbours += gameGrid[i + x][j + y];
           }
        } else if (edgeCondition === "wrap") {
        const xWrapAroundOffset = (i + x + gameGrid[i].length) % gameGrid[i].length;
        const yWrapAroundOffset = (j + y + gameGrid.length) % gameGrid.length;
        liveNeighbours += gameGrid[xWrapAroundOffset][yWrapAroundOffset];
        };
      });
      if (liveNeighbours < 2 || liveNeighbours > 3) {
        newGameGrid[i][j] = 0;
      } else if (gameGrid[i][j] === 0 && liveNeighbours === 3) {
        newGameGrid[i][j] = 1;
      }
    }
  };
  setGameGrid(newGameGrid);
};

return runGame;
}
*/
export default gameLoop;