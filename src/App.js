import { useState } from "react";
import "./App.css";

function App() {
  let numRows = 50;
  let numCols = 30;

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

  return (
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
              style={{
                border: "solid 1px black",
                borderRadius: "100%",
                width: 20,
                height: 20,
              }}
              key={`${i}-${j}`}
              onClick={() => {
                console.log("click");
              }}
            />
          );
        });
      })}
    </div>
  );
}

export default App;
