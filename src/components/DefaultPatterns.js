import React from "react";
import useModals from "../hooks/useModals";
import PatternsModal from "./PatternsModal";
import { patterns } from "../utils/patterns";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBraille } from "@fortawesome/free-solid-svg-icons";

// Componente que va a hacer uso del modal de patrones
const DefaultPatterns = ({ selectPattern }) => {
  // Uso un hook personalizado para controlar apertura y cierre del modal
  const [isOpen, openModal, closeModal] = useModals(false);

  return (
    <div>
      {/* Botón que se muestra en pantalla y que abre el modal */}
      <button className="buttons" onClick={openModal}>
        Cambiar patrón <FontAwesomeIcon icon={faBraille} />
      </button>

      {/* Modal que contiene un map con todos los patrones cargados */}
      <PatternsModal isOpen={isOpen} closeModal={closeModal}>
        {patterns.map((pattern) => {
          return (
            <div key={pattern.id}>
              <h3>{pattern.name}</h3>
              <p>Tipo : {pattern.type}</p>
              <div>
                <div>
                  <img src={pattern.image} alt={pattern.name} />
                </div>
                <div>
                  <button
                    className="buttons"
                    onClick={() => {
                      selectPattern(pattern.id);
                      closeModal();
                    }}
                  >
                    Seleccionar
                  </button>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </PatternsModal>
    </div>
  );
};

export default DefaultPatterns;
