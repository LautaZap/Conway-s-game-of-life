import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const neighborsCells = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, -1],
  [1, 1],
  [-1, 1],
  [1, 0],
  [-1, 0],
];

function App() {
  let numRows = 9;
  let numCols = 9;
  const timer = 1000;

  const emptyGrid = () => {
    let newGrid = [];
    for (let i = 0; i < numRows; i++) {
      const newCol = [];
      for (let j = 0; j < numCols; j++) {
        newCol.push(0);
      }
      newGrid.push(newCol);
    }
    return newGrid;
  };

  const [grid, setGrid] = useState(emptyGrid);
  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleClick = (i, j) => {
    const copy = [...grid];
    copy[i][j] = copy[i][j] === 0 ? 1 : 0;
    setGrid(copy);
  };

  const simulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((prevValues) => {
      let nextGrid = emptyGrid();
      let copyGrid = [...prevValues];
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          neighborsCells.forEach((cell) => {
            let x = (cell[0] + i + numRows) % numRows;
            let y = (cell[1] + j + numCols) % numCols;
            neighbors += copyGrid[x][y];
          });

          if (neighbors < 2 || neighbors > 3) {
            nextGrid[i][j] = 0;
          } else if (neighbors === 3) {
            nextGrid[i][j] = 1;
          } else {
            nextGrid[i][j] = copyGrid[i][j];
          }
        }
      }
      return nextGrid;
    });

    setTimeout(() => {
      simulation();
    }, timer);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            simulation();
          }
        }}
      >
        {running ? "stop" : "start"}
      </button>
      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          gridGap: "10px",
          margin: "10px",
        }}
      >
        {grid.map((rows, i) => {
          return rows.map((cell, j) => {
            return (
              <div
                key={`${i}-${j}`}
                onClick={() => {
                  handleClick(i, j);
                }}
                style={{
                  border: "solid 1px black",
                  borderRadius: "100%",
                  width: 20,
                  height: 20,
                  backgroundColor: cell === 0 ? "" : "green",
                }}
              />
            );
          });
        })}
      </div>
    </>
  );
}

export default App;
