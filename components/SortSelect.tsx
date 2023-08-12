import { FC } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Select from "react-select";
import React from "react";
import { InputActionMeta } from "react-select";

export enum Sort {
  PriceAsc = "priceAsc",
  PriceDsc = "priceDsc",
  RatingAsc = "ratingAsc",
  RatingDsc = "ratingDsc",
  FloatAsc = "floatAsc",
  FloatDsc = "floatDsc",
  CollectionAsc = "collectionAsc",
  CollectionDsc = "collectionDsc",
  StickerPriceDsc = "stickerDsc",
}

interface SortSelectProps {
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
}

const SortSelect: FC<SortSelectProps> = ({ sort, setSort }) => {
  const sortOptions = [
    { value: Sort.PriceAsc, label: "Lowest Price" },
    { value: Sort.PriceDsc, label: "Highest Price" },
    { value: Sort.RatingAsc, label: "Lowest Rating" },
    { value: Sort.RatingDsc, label: "Highest Rating" },
    { value: Sort.FloatAsc, label: "Lowest Float" },
    { value: Sort.FloatDsc, label: "Highest Float" },
    { value: Sort.CollectionAsc, label: "Newest Collection" },
    { value: Sort.CollectionDsc, label: "Oldest Collection" },
    { value: Sort.StickerPriceDsc, label: "Highest Sticker Price" },
  ];

  return (
    <Select
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: "inherit",
          color: "white",
          border: 0,
          minHeight: 0,
          boxShadow: "none",
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
          paddingTop: 0,
          paddingBottom: 0,
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "#696995",
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
      options={sortOptions}
      onChange={(e) => e && setSort(e.value as any)}
      value={
        sortOptions.find((option) => option.value === sort) ?? sortOptions[0]
      }
      placeholder="Select an option"
      inputValue={""}
    />
  );
};

export default SortSelect;
