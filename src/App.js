import { useCallback, useRef, useState, useEffect } from "react";
import "./App.css";
import DefaultPatterns from "./components/DefaultPatterns";
import ErrorMessage from "./components/ErrorMessage";
import Grid from "./components/Grid";
import GridSizeForm from "./components/GridSizeForm";
import Info from "./components/Info";
import TimerForm from "./components/TimerForm";
import { patterns } from "./utils/patterns";
import { neighborsCells } from "./utils/neighborCells";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faForwardStep,
  faPause,
  faPlay,
  faArrowRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  // Contiene las cantidades de filas y columnas
  const [gridSize, setGridSize] = useState({ row: 50, col: 30 });

  // Contiene el intervalo de ejecución de cada generación
  const [timer, setTimer] = useState(300);

  // Controla la entrada de los inputs
  const [input, setInput] = useState({
    row: 50,
    col: 30,
    timer: 300,
  });

  // Función encargada de controlar el cambio de los inputs de los formularios
  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  // Contiene el Id del patron a imprimir en la grilla, por defecto, 1 = punto
  const [select, setSelect] = useState("1");

  // Variable de referencia para el tamaño de la grilla
  const sizeRef = useRef(gridSize);
  sizeRef.current = gridSize;

  // Función que devuelve una grilla vacía con el tamaño indicado
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

  // Estados que contiene la grilla, iniciada con una grilla vacía con la funcion anteriormente declarada
  const [grid, setGrid] = useState(emptyGrid);

  // Estado para controlar la ejecución de la simulación
  const [running, setRunning] = useState(false);

  // Estado para controlar la generación actual
  const [generation, setGeneration] = useState(0);

  // Estado para controlar el mensaje de error al intentar poner un patrón demasiado grande para la grilla
  const [message, setMessage] = useState("");

  // Variable con referencia al valor de "running"
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
        copy[newX][newY] = copy[newX][newY] === 0 ? 1 : 0;
      });
    } else {
      // De no cumplirse la condicion de tamaño mínimo se muestra un mensaje de error en pantalla
      setMessage(
        `Error! la grilla deberá tener como mínimo ${minCols} columnas y ${minRows} filas para usar el patron "${name}"`
      );

      // Pasados 4 segundos el mensaje de error desaparecerá
      setTimeout(() => {
        setMessage("");
      }, 4000);
    }

    setGrid(copy);
  };

  const simulation = () => {
    // Compruebo que el usuario haya puesto en ejecución la simulación, de lo contrario salgo
    if (!runningRef.current) {
      return;
    }

    nextGeneration();

    // La funcion de va a seguir llamando de forma recursiva hasta que running sea falso
    // Uso la variable timer para establecer la frecuencia a la que se ejecuta la función simulation
    setTimeout(() => {
      simulation();
    }, timer);
  };

  // Función que se encarga de reiniciar la grilla
  const handleReset = () => {
    setGrid(emptyGrid);
    setGeneration(0);
    setRunning(false);
  };

  //  Función que se encarga de avanzar a la siguiente generación
  //  Se utiliza el hook useCallback para evitar que la función vuelva a crearse en cada render
  const nextGeneration = useCallback(() => {
    setGrid((prevValues) => {
      // Se crea una grilla que se usara para la proxima generación
      let nextGrid = emptyGrid();
      for (let i = 0; i < sizeRef.current.row; i++) {
        for (let j = 0; j < sizeRef.current.col; j++) {
          let neighbors = 0;

          // Recorro las celdas vecinas usando las coordenadas de neigborsCells
          neighborsCells.forEach((cell) => {
            // Ecuación que me otorga las coordenadas de las celdas continuas
            // Cumpliendo la regla de que los extremos se conectan entre sí
            let x = (cell[0] + i + sizeRef.current.row) % sizeRef.current.row;
            let y = (cell[1] + j + sizeRef.current.col) % sizeRef.current.col;

            // Acumulo la cantidad de vecinos vivos que tiene cada celda
            neighbors += prevValues[x][y];
          });

          // Reglas establecidas por Conway para que la celda elegida viva o muera
          if (neighbors < 2 || neighbors > 3) {
            nextGrid[i][j] = 0;
          } else if (neighbors === 3) {
            nextGrid[i][j] = 1;
          } else {
            // En caso de que ninguna de las reglas guardo el estado tal cual está en esa posicion
            nextGrid[i][j] = prevValues[i][j];
          }
        }
      }
      return nextGrid;
    });

    // Paso a la siguiente generación
    setGeneration((prevValues) => {
      return ++prevValues;
    });
  }, []);

  // Función para manejar el cambio de tamaño de la grilla
  const handleGridSize = (e) => {
    e.preventDefault();
    setGridSize({ row: input.row, col: input.col });
    setGrid(emptyGrid);
    setGeneration(0);
  };

  // Función encargada de reiniciar el tamaño de la grilla al solicidato por defecto
  const resetSize = (e) => {
    e.preventDefault();
    setInput((prevValues) => {
      return { ...prevValues, row: 50, col: 30 };
    });
    setGridSize({ row: 50, col: 30 });
    setGrid(emptyGrid);
    setGeneration(0);
  };

  // Función encargada de cambiar el intervalo de tiempo
  const handleTimer = (e) => {
    e.preventDefault();
    setTimer(input.timer);
  };

  // Función encargada de reiniciar el intervalo de tiempo al valor predeterminado
  const resetTimer = (e) => {
    e.preventDefault();
    setTimer(300);
    setInput((prevValues) => {
      return { ...prevValues, timer: 300 };
    });
  };

  // Creo un estado para controlar si se recibieron los datos de la grilla en el localStorage
  const [localSorageGrid, setLocalSorageGrid] = useState(false);

  // Una vez renderizada la página se traeran los datos que haya en el localStorage y localStorageGrid pasara a true
  // Cada vez que se realice un cambio tanto en la grilla como en el intervalo de tiempo se guardaran dichos cambios
  useEffect(() => {
    // Si el estado de localStorageGrid es falso, accedo a los datos de localstorage
    if (!localSorageGrid) {
      const gridLocalStorage = JSON.parse(
        window.localStorage.getItem("Conway's game of life")
      );

      // Cambio el valor de localStorageGrid para indicar que para este punto ya se trajeron los datos del localStorage
      setLocalSorageGrid(true);
      if (!gridLocalStorage) {
        return;
      }
      setGrid(gridLocalStorage.grid);
      setGridSize(gridLocalStorage.gridSize);
      setTimer(gridLocalStorage.timer);
      setGeneration(gridLocalStorage.generation);
    }

    // Una vez que los datos de localStorage son recuperados cada vez que se llame a este useEffect se actualizará el almacenamiento
    else {
      const dataLocalStorage = {
        grid: grid,
        timer: timer,
        gridSize: gridSize,
        generation: generation,
      };
      window.localStorage.setItem(
        "Conway's game of life",
        JSON.stringify(dataLocalStorage)
      );
    }
  }, [grid, timer, generation, gridSize, localSorageGrid]);

  // Función para cambiar el estado de select por el id del patron deseado
  const selectPattern = (id) => {
    setSelect(id);
  };

  return (
    <div className="container">
      <h1>Conway's Game of Life</h1>

      <Info
        rows={gridSize.row}
        cols={gridSize.col}
        generation={generation}
        timer={timer}
      />

      {message && <ErrorMessage message={message} />}

      <div className="div-buttons">
        <div className="div-control-buttons">
          <button
            onClick={() => {
              setRunning(!running);
              if (!running) {
                runningRef.current = true;
                simulation();
              }
            }}
            className="buttons"
          >
            {running ? (
              <>
                Detener <FontAwesomeIcon icon={faPause} />
              </>
            ) : (
              <>
                Iniciar <FontAwesomeIcon icon={faPlay} />
              </>
            )}
          </button>

          <button
            className="buttons"
            onClick={() => {
              nextGeneration();
            }}
          >
            Siguiente generación <FontAwesomeIcon icon={faForwardStep} />
          </button>

          <button onClick={() => handleReset()} className="buttons">
            Reiniciar <FontAwesomeIcon icon={faArrowRotateLeft} />
          </button>
        </div>

        <div className="div-patterns">
          <DefaultPatterns
            className="button-patterns"
            selectPattern={selectPattern}
          />
          <span>
            Seleccionado:{" "}
            {patterns.find((element) => element.id === select).name}
          </span>
        </div>
      </div>

      <Grid grid={grid} handleClick={handleClick} cols={gridSize.col} />

      <div className="div-timer-size">
        <TimerForm
          handleTimer={handleTimer}
          timer={input.timer}
          handleInputChange={handleInputChange}
          resetTimer={resetTimer}
        />
        <GridSizeForm
          handleGridSize={handleGridSize}
          handleInputChange={handleInputChange}
          row={input.row}
          col={input.col}
          resetSize={resetSize}
        />
      </div>

      <div className="name">
        <span>Por Lautaro Zapata 2022</span>
      </div>
    </div>
  );
}

export default App;
