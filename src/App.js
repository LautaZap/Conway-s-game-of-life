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
  const timer = 300;

  const [gridSize, setGridSize] = useState({ row: 9, col: 9 });
  const [input, setInput] = useState({ row: 0, col: 0 });
  const sizeRef = useRef(gridSize);
  sizeRef.current = gridSize;

  const emptyGrid = () => {
    let newGrid = [];
    for (let i = 0; i < sizeRef.current.row; i++) {
      const newRow = [];
      for (let j = 0; j < sizeRef.current.col; j++) {
        newRow.push(0);
      }
      newGrid.push(newRow);
    }
    return newGrid;
  };

  const [grid, setGrid] = useState(emptyGrid);
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleClick = (i, j) => {
    const copy = [...grid];
    copy[i][j] = copy[i][j] === 0 ? 1 : 0;
    setGrid(copy);
  };

  const simulation = () => {
    if (!runningRef.current) {
      return;
    }

    nextGeneration();

    setTimeout(() => {
      simulation();
    }, timer);
  };

  const handleReset = () => {
    setGrid(emptyGrid);
    setGeneration(0);
  };

  const nextGeneration = useCallback(() => {
    setGrid((prevValues) => {
      let nextGrid = emptyGrid();
      let copyGrid = [...prevValues];
      for (let i = 0; i < gridSize.row; i++) {
        for (let j = 0; j < gridSize.col; j++) {
          let neighbors = 0;
          neighborsCells.forEach((cell) => {
            let x = (cell[0] + i + gridSize.row) % gridSize.row;
            let y = (cell[1] + j + gridSize.col) % gridSize.col;
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

    setGeneration((prevValues) => {
      return ++prevValues;
    });
  }, []);

  const handleGridSize = (e) => {
    e.preventDefault();
    setGridSize({ row: input.row, col: input.col });
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  useEffect(() => {
    setGrid(emptyGrid);
  }, [gridSize]);

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
        {running ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          nextGeneration();
        }}
      >
        Next Generation
      </button>
      <button onClick={() => handleReset()}>Reset</button>
      <span>generacion - {generation}</span>

      <div
        className="App"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize.col}, 20px)`,
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
      <form className="row" onSubmit={handleGridSize}>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Filas"
            className="form-control"
            onChange={handleInputChange}
            name="row"
          ></input>
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Columnas"
            className="form-control"
            onChange={handleInputChange}
            name="col"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </>
  );
}

export default App;
