import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Forms.css";

// Componente que contiene el formulario para cambiar el tamaño de la grilla
const GridSizeForm = ({
  handleGridSize,
  handleInputChange,
  row,
  col,
  resetSize,
}) => {
  return (
    <div className="container-form">
      <form onSubmit={handleGridSize} className="form-size-grid">
        <span>
          <strong>Tamaño grilla</strong>
        </span>
        <div className="div-size-grid">
          <label htmlFor="row" className="label-size-grid">
            Filas:{" "}
          </label>
          <input
            type="number"
            placeholder="Filas"
            onChange={handleInputChange}
            className="custom-input"
            value={row}
            name="row"
            min="0"
            required
          ></input>
        </div>
        <div className="div-size-grid">
          <label htmlFor="row" className="label-size-grid">
            Columnas:{" "}
          </label>
          <input
            type="number"
            placeholder="Columnas"
            className="custom-input"
            onChange={handleInputChange}
            value={col}
            name="col"
            min="0"
            required
          ></input>
        </div>
        <button type="submit" className="button-form">
          Establecer
        </button>
        <button type="submit" className="button-reset" onClick={resetSize}>
          <FontAwesomeIcon icon={faArrowRotateLeft} />
        </button>
      </form>
    </div>
  );
};

export default GridSizeForm;
