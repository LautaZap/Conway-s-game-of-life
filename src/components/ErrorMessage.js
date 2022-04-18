import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="div-error">
      <span className="error-msg">{message}</span>
    </div>
  );
};

export default ErrorMessage;
