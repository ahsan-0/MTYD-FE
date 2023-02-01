import { createSlice } from '@reduxjs/toolkit'

export const boardSlice = createSlice({
  name: 'board',
  initialState: {
    configuration: "000001111100000 ".repeat(15).slice(0, -1).split(" ").map(m => m.split("").map(m => +m)),
    running: false,
    wrap: true,
    interval: 2000 
  },
  reducers: {
    nextBoard: state => {
    const nextBoard = [...state.configuration]
    const nextBoard2 = []
    for (let i = 0; i < nextBoard.length; i++) {
      nextBoard2.push([])
      for (let j = 0; j < nextBoard[i].length; j++) {
        nextBoard2[i].push(0)
        let liveNeighbours = 0;
        coordOffset.forEach(([x, y]) => {
          if (state.wrap === false) {
            if (
              i + x >= 0 &&
              i + x < nextBoard.length &&
              j + y >= 0 &&
              j + y < nextBoard[i].length
            ) {
              liveNeighbours += nextBoard[i + x][j + y];
            }
          } else if (state.wrap === true) {
            const xWrapAroundOffset =
              (i + x + nextBoard[i].length) % nextBoard[i].length;
            const yWrapAroundOffset =
              (j + y + nextBoard.length) % nextBoard.length;
            liveNeighbours += nextBoard[xWrapAroundOffset][yWrapAroundOffset];
          }
        });
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          nextBoard2[i][j] = 0;
        } else if (nextBoard[i][j] === 0 && liveNeighbours === 3) {
          nextBoard2[i][j] = 1;
        }else if (nextBoard[i][j] === 1 && liveNeighbours === 2 ) {
          nextBoard2[i][j] = 1;
        }

      }
    }
 
    return {
      ...state, configuration: nextBoard2,
    }


  },
  flipRunning: state => {
    return {...state, running: !state.running}
  },
  flipWrap: state => {
    return {...state, wrap: !state.wrap}
  },
  increaseSpeed: state => {
    return {...state, interval: state.interval - 150}
  },
  decreaseSpeed: state => {
    return {...state, interval: state.interval + 150}
  }
  }
})

// Action creators are generated for each case reducer function
export const {nextBoard, flipRunning, flipWrap, increaseSpeed, decreaseSpeed} = boardSlice.actions

export default boardSlice.reducer

  const coordOffset = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];