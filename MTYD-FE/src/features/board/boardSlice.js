import { createSlice } from "@reduxjs/toolkit";
import * as THREE from "three";
import img from "../../assets/green.png";
import { v4 as uuidv4 } from "uuid";
import { useTexture } from "@react-three/drei";

const boardArray = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 
  [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    configuration: boardArray,
    running: false,
    wrap: true,
    interval: 1000,
    tableTexture: new THREE.TextureLoader().load(img),
    title: true,
    username: 'andy09',
    effect: 'sky'
  },
  reducers: {
    nextBoard: (state) => {
      const nextBoard = [...state.configuration];
      const nextBoard2 = [];
      for (let i = 0; i < nextBoard.length; i++) {
        nextBoard2.push([]);
        for (let j = 0; j < nextBoard[i].length; j++) {
          nextBoard2[i].push(0);
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
          } else if (nextBoard[i][j] === 1 && liveNeighbours === 2) {
            nextBoard2[i][j] = 1;
          } else if (nextBoard[i][j] === 1 && liveNeighbours === 3) {
            nextBoard2[i][j] = 1;
          }
        }
      }

      return {
        ...state,
        configuration: nextBoard2,
      };
    },
    flipRunning: (state, action) => {
      return { ...state, running: !state.running };
    },
 
    flipWrap: (state) => {
      return { ...state, wrap: !state.wrap };
    },
    increaseSpeed: (state) => {
      return { ...state, interval: state.interval - 150 };
    },
    decreaseSpeed: (state) => {
      return { ...state, interval: state.interval + 150 };
    },
    increaseBoard: (state) => {
      const emptyRow = Array.from(state.configuration).fill(0);
      return {
        ...state, interval: 1200,
        configuration: [...state.configuration, emptyRow].map((row) => {
          const newRow = [...row, 0];
          return newRow.map((cell) => {
            return cell;
          });
        }),
      };
    },
    decreaseBoard: (state) => {
      return {
        ...state, interval: 1200,
        configuration: state.configuration
          .slice(0, state.configuration.length - 1)
          .map((row) => {
            return row.slice(0, row.length - 1).map((cell) => {
              return cell;
            });
          }),
      };
    },
    updateBoard: (state, action) => {
      const cellCoord = action.payload;
      // make new array
      // update live/dead state at payload coord
      // return updated config
      const configCopy = state.configuration.map((m) => m.map((m) => m));
      configCopy[cellCoord[0]][cellCoord[1]] === 1
        ? (configCopy[cellCoord[0]][cellCoord[1]] = 0)
        : (configCopy[cellCoord[0]][cellCoord[1]] = 1);
      return { ...state, configuration: configCopy };
    },
    resetBoard: state => {
      return {...state, configuration: boardArray};
    },
    randomiseBoard: state => {
      const rows = [];
      for (let i = 0; i < state.configuration.length; i++) {
        rows.push(Array.from(Array(state.configuration[i].length), () => {
          return Math.random() > 0.7 ? 1 : 0;
        }));
      };

      return {...state, configuration: rows}
    },
    hideTitle: state => {
      return {...state, title: !state.title};
    },
    clearTable: state => {
      const rows = [];
      for (let i = 0; i < state.configuration.length; i++) {
        rows.push(Array.from(Array(state.configuration[i].length), () => 0));
      };
      return {...state, configuration: rows};
    },
    displayPattern: (state, action) => {
      const pattern = action.payload.split(" ").map(m => m.split("").map(m => +m));
      return {...state, configuration: pattern};
    },
    selectSky: state => {
      return {...state, effect: "sky"};
    },
    selectStars: state => {
      return {...state, effect: "stars"};
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  nextBoard,
  flipRunning,
  flipWrap,
  increaseSpeed,
  decreaseSpeed,
  increaseBoard,
  decreaseBoard,
  updateBoard,
  resetBoard,
  randomiseBoard,
  hideTitle,
  clearTable,
  displayPattern,
  selectSky,
  selectStars
} = boardSlice.actions;

export default boardSlice.reducer;

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
