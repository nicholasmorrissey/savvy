import { FC, InputHTMLAttributes } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import "../styles/radio_button.scss";

interface RadioButtonProps {
  checked?: boolean;
  label?: string;
  onClick?: () => void;
}

const RadioButton: FC<RadioButtonProps> = ({ checked, label }) => {
  return (
    <span style={{ display: "flex", alignItems: "center" }}>
      <div className="buttonContainer">
        <div className="button" />
      </div>
      {label && (
        <span style={{ color: "#6a6a93", paddingLeft: "1rem" }}>{label}</span>
      )}
    </span>
  );
};

export default RadioButton;
