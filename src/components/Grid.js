import React from "react";
import "./Grid.css";

// Componente encargado de mostrar la grilla
const Grid = ({ grid, handleClick, cols }) => {
  return (
    <div className="container-grid">
      <div
        className="div-grid"
        // De manera dinamica se establece la cantidad de columnas
        style={{
          gridTemplateColumns: `repeat(${cols}, 20px)`,
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
                  backgroundColor: cell === 0 ? "" : "#5cb85c",
                }}
              />
            );
          });
        })}
      </div>
    </div>
  );
};

export default Grid;
