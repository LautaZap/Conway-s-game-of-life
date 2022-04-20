import React from "react";
import "./PatternModal.css";

// Ventana modal que muestra todos los patrones cargados y con la posibilidad de seleccionar el deseado con el id
const PatternsModal = ({ children, isOpen, closeModal }) => {
  return (
    <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
      <div className="modal-container">
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default PatternsModal;
