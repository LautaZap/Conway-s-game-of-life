import React from "react";
import "./Info.css";

// Componente que muestra información
const Info = ({ generation, cols, rows, timer }) => {
  return (
    <div className="div-info">
      <div>
        <h1>Información</h1>
      </div>
      <div>
        <h3>{`Generación Actual: ${generation}`}</h3>
        <span>{`Intervalo en milisegundos: ${timer}`}</span>
        <h5>{`Numero de filas: ${rows}`}</h5>
        <h5>{`Numero de columnas: ${cols}`}</h5>
      </div>
    </div>
  );
};

export default Info;
