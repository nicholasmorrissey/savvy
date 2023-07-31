import { FC, InputHTMLAttributes } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import styles from "../styles/listing_styles.module.scss";
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  spanProps?: any;
  symbol?: string;
}

const TextInput: FC<TextInputProps> = ({ spanProps, symbol, ...props }) => {
  return (
    <span className={styles.currencyInput} {...spanProps}>
      {symbol && <span style={{ marginRight: "0.6rem" }}>{symbol}</span>}
      <input {...props} className={styles.textInput} />
    </span>
  );
};

export default TextInput;
