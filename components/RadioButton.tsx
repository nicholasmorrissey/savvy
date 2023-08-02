import { FC, InputHTMLAttributes } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import styles from "../styles/listing_styles.module.scss";

interface RadioButtonProps {
  checked?: boolean;
  label?: string;
}

const RadioButton: FC<RadioButtonProps> = ({ checked, label }) => {
  return (
    <>
      <div
        style={{
          borderRadius: "20px",
          padding: "5px",
          border: "1px solid rgb(84 84 117)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "10px",
            backgroundColor: "rgb(106, 106, 147)",
          }}
        />
      </div>
      {label && (
        <span style={{ color: "#6a6a93", paddingLeft: "1rem" }}>{label}</span>
      )}
    </>
  );
};

export default RadioButton;
