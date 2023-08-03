import { FC, InputHTMLAttributes } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import "../styles/radio_button.scss";

interface RadioButtonProps {
  checked?: boolean;
  label?: string;
  onClick?: () => void;
}

const RadioButton: FC<RadioButtonProps> = ({ checked, label, onClick }) => {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => (onClick ? onClick() : null)}
    >
      <div className="buttonContainer">
        {checked ? (
          <div className="buttonChecked" />
        ) : (
          <div className="buttonUnchecked" />
        )}
      </div>
      {label && (
        <span style={{ color: "#6a6a93", paddingLeft: "1rem" }}>{label}</span>
      )}
    </span>
  );
};

export default RadioButton;
