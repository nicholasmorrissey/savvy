import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Select from "react-select";
import React from "react";
import { InputActionMeta } from "react-select";
import StateManagedSelect, {
  StateManagerProps,
} from "react-select/dist/declarations/src/stateManager";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  setValue: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
}

const MultiSelect: FC<StateManagerProps> = ({ ...props }) => {
  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "inherit",
          color: "white",
          border: "1px solid #3a3a59",
          minHeight: 0,
          boxShadow: "none",
          ":hover": {
            border: "1px solid #3a3a59",
          },
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "inherit",
          color: "white",
          marginRight: "0.5rem",
          border: 0,
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          padding: "0.5rem",
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "#2b2b43",
        }),
        multiValueLabel: (baseStyles, state) => ({
          ...baseStyles,
          color: "#696995",
        }),
        multiValueRemove: (baseStyles, state) => ({
          ...baseStyles,
          color: "#696995",
          "&:hover": {
            backgroundColor: "inherit",
            color: "white",
          },
        }),
        menu: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgb(27 27 41)",
          color: "white",
        }),
        indicatorSeparator: (baseStyles, state) => ({
          ...baseStyles,
          display: "none",
        }),
        indicatorsContainer: (baseStyles, state) => ({
          ...baseStyles,
          alignSelf: "center",
          "> div": {
            color: "#696995",
            ":hover": {
              color: "white",
            },
          },
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "#515172",
          fontSize: "0.9rem",
          opacity: 0.8,
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: "#515172",
          fontSize: "0.9rem",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "rgb(27 27 41)",
          "&:hover": {
            backgroundColor: "#44446d",
          },
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          color: "#696995",
          paddingTop: 0,
          paddingBottom: 0,
        }),
      }}
      isMulti
      placeholder="Select an option"
      {...props}
    />
  );
};

export default MultiSelect;
