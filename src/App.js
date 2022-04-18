import { useCallback, useRef, useState, useEffect } from "react";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import { patterns } from "./utils/patterns";

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
  const [gridSize, setGridSize] = useState({ row: 10, col: 10 });
  const [input, setInput] = useState({ row: 0, col: 0, timer: 0 });
  const [select, setSelect] = useState("1");
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
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(300);

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleClick = (i, j) => {
    // Selecciono en patterns a través del id el patron deseado
    const { minCols, minRows, name, pattern } = patterns.find(
      (element) => element.id === select
    );

    // Realizo una copia del tablero
    const copy = [...grid];

    // Compruebo que la matriz actual cumpla con el tamaño minimo del patron seleccionado
    if (minCols <= gridSize.col && minRows <= gridSize.row) {
      // Recorro todas las coordenadas de las celdas vecinas y les asigno el estado "vivo" a las correspondientes
      pattern.forEach((cell) => {
        const newX = (i + cell[0] + gridSize.row) % gridSize.row;
        const newY = (j + cell[1] + gridSize.col) % gridSize.col;
        copy[newX][newY] = 1;
      });
    } else {
      // De no cumplirse la condicion de tamaño mínimo se muestra un mensaje de error en pantalla
      setMessage(
        `Error! la matriz deberá tener como mínimo ${minCols} columnas y ${minRows} filas para usar el patron "${name}"`
      );

      // Pasados 2 segundos el mensaje de error desaparecerá
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }

    setGrid(copy);
  };

  const simulation = () => {
    if (!runningRef.current) {
      return;
    }

    nextGeneration();

    setTimeout(() => {
      simulation();
      // window.localStorage.setItem(
      //   "Conway's game of life",
      //   JSON.stringify(grid)
      // );
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
      for (let i = 0; i < sizeRef.current.row; i++) {
        for (let j = 0; j < sizeRef.current.col; j++) {
          let neighbors = 0;
          neighborsCells.forEach((cell) => {
            let x = (cell[0] + i + sizeRef.current.row) % sizeRef.current.row;
            let y = (cell[1] + j + sizeRef.current.col) % sizeRef.current.col;
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
    setGrid(emptyGrid);
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const handleTimer = (e) => {
    e.preventDefault();
    setTimer(input.timer);
  };

  // Creo un estado para controlar si se recibieron los datos de la grilla en el localStorage
  const [localSorageGrid, setLocalSorageGrid] = useState(false);

  useEffect(() => {
    // Si el estado de localStorageGrid es falso, accedo a los datos de localstorage
    if (!localSorageGrid) {
      const gridLocalStorage = JSON.parse(
        window.localStorage.getItem("Conway's game of life")
      );
      if (!gridLocalStorage) {
        return;
      }
      setGrid(gridLocalStorage);
      setLocalSorageGrid(true);
    }

    // Una vez que los datos de localStorage son recuperados cada vez que se llame a este useEffect se actualizará el almacenamiento
    else {
      window.localStorage.setItem(
        "Conway's game of life",
        JSON.stringify(grid)
      );
    }
  }, [grid]);

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

      <form onSubmit={handleTimer}>
        <div>
          <input
            type="text"
            placeholder="Milisegundos"
            className="form-control"
            onChange={handleInputChange}
            value={input.timer}
            name="timer"
          ></input>
          <button type="submit"> Establecer intervalo </button>
        </div>
      </form>

      <button
        onClick={() => {
          nextGeneration();
        }}
      >
        Next Generation
      </button>
      <button onClick={() => handleReset()}>Reset</button>
      <span>generacion - {generation}</span>

      <select value={select} onChange={handleSelect}>
        {patterns.map((element) => {
          return (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          );
        })}
      </select>

      {message && <ErrorMessage message={message} />}

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
      <form onSubmit={handleGridSize}>
        <div>
          <input
            type="text"
            placeholder="Filas"
            className="form-control"
            onChange={handleInputChange}
            value={input.row}
            name="row"
          ></input>
        </div>
        <div>
          <input
            type="text"
            placeholder="Columnas"
            className="form-control"
            onChange={handleInputChange}
            value={input.col}
            name="col"
          ></input>
        </div>
        <button type="submit">Enviar</button>
        <hr />
      </form>
    </>
  );
}

export default App;
