import React from "react";
import "./Forms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

// Componente que renderiza el formulario para cambiar el tiempo de ejecución
const TimerForm = ({ handleTimer, handleInputChange, timer, resetTimer }) => {
  return (
    <>
      <form onSubmit={handleTimer} className="timer-form">
        <div>
          <label htmlFor="timer">
            <strong>Intervalo actualización(ms): </strong>
          </label>
          <input
            type="number"
            placeholder="Milisegundos"
            className="custom-input"
            onChange={handleInputChange}
            value={timer}
            name="timer"
            required
            min="0"
          ></input>
          <button type="submit" className="button-form">
            {" "}
            Aceptar
          </button>
          <button type="submit" className="button-reset" onClick={resetTimer}>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </button>
        </div>
      </form>
    </>
  );
};

export default TimerForm;
