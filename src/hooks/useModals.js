import { useState } from "react";

const useModals = ({ initialValue = false }) => {
  // uso un hook para controlar la apertura y cierre del modal
  const [isOpen, setIsOpen] = useState(initialValue);

  // creo funciones que cambiaran el estado de isOpen
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Devuelvo un array con el estado y las funciones para cambiarlo
  return [isOpen, openModal, closeModal];
};

export default useModals;
